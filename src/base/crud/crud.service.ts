import { InternalServerErrorException } from '@nestjs/common'

import { NotFoundError, ModelClass, raw } from 'objection'

import { BaseModel } from '../../database/models/base.model'
import { IPagination, PaginationParams } from './pagination'

export interface ICrudService<T> {
    findAll(): Promise<T[]>

    findOne(id: string | number): Promise<T>

    paginatedFindAll(filter?: PaginationParams<T>): Promise<IPagination<T>>

    remove(id: string | number): Promise<T>
}

/**
 * Abstract base service that other services can extend to provide base CRUD
 * functionality such as to create, find, update and delete data.
 */
export abstract class CrudService<T extends BaseModel> implements ICrudService<T> {
    saltRounds: number

    /**
     * The constructor must receive the injected model from the child service in
     * order to provide all the proper base functionality.
     *
     * @param {Model} model - The injected model.
     */
    protected constructor(protected readonly model: ModelClass<T>) {
        this.saltRounds = 12
    }

    /**
     * Finds all entries and return the result
     *
     * @throws InternalServerErrorException
     */
    async findAll() {
        try {
            return (this.model.query() as unknown) as Promise<T[]>
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    /**
     * Finds paginated entries and return the result
     *
     * @throws InternalServerErrorException
     */
    async paginatedFindAll(filter: PaginationParams<T>) {
        const { page = 0, pageSize = 10, order } = filter

        try {
            const { results, total } = await this.model.query().page(page, pageSize)

            return ({
                data: results,
                paging: {
                    pageSize,
                    page,
                    total,
                    totalPages: Math.ceil(total / pageSize),
                },
            } as unknown) as Promise<IPagination<T>>
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    /**
     * Finds paginated entries and return the result
     *
     * @throws NotFoundError
     */
    async findOne(id: string | number): Promise<T> {
        return (this.model
            .query()
            .findById(id)
            .first()
            .throwIfNotFound() as unknown) as Promise<T>
    }

    /**
     * Soft-deletes a entry and return it
     */
    remove(id: number) {
        return (this.model.query().patchAndFetchById(id, {
            deleted_at: raw('CURRENT_TIMESTAMP'),
        }) as unknown) as Promise<T>
    }
}
