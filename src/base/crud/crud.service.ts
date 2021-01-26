import { InternalServerErrorException } from '@nestjs/common'

import { ModelClass, raw } from 'objection'

import { BaseModel } from '../../database/models/base.model'
import { IPagination, PaginationParams } from './pagination'

export interface ICrudService<T> {
    findAll(): Promise<T[]>

    findOneById(id: number): Promise<T>

    findOneByEmail(email: string): Promise<T>

    paginatedFindAll(
        paginationParams?: PaginationParams<T>,
    ): Promise<IPagination<T>>

    remove(id: number): Promise<T>
}

/**
 * Abstract base service that other services can extend to provide base CRUD
 * functionality such as to create, find, update and delete data.
 */
export abstract class CrudService<T extends BaseModel> implements ICrudService<T> {
    /**
     * The constructor must receive the injected model from the child service in
     * order to provide all the proper base functionality.
     *
     * @param {Model} model - The injected model.
     */
    protected constructor(protected readonly model: ModelClass<T>) {}

    /**
     * Finds all entries and return the result
     *
     * @throws InternalServerErrorException
     */
    async findAll() {
        try {
            return (this.model.query() as unknown) as Promise<T[]>
        } catch (e) {
            return Promise.reject(e)
        }
    }

    /**
     * Finds paginated entries and return the result
     *
     * @throws InternalServerErrorException
     */
    async paginatedFindAll(paginationParams: PaginationParams<T>) {
        const { page = 0, pageSize = 3, order } = paginationParams

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
            return Promise.reject(e)
        }
    }

    /**
     * Finds one entry with where filter and return the result
     *
     * @throws InternalServerErrorException
     */
    async findOne(filter = {}) {
        try {
            return (this.model.query().findOne(filter) as unknown) as Promise<T>
        } catch (e) {
            return Promise.reject(e)
        }
    }

    /**
     * Finds paginated entries and return the result
     *
     * @throws NotFoundError
     */
    async findOneById(id: number): Promise<T> {
        try {
            return (this.model
                .query()
                .findById(id)
                .first() as unknown) as Promise<T>
        } catch (e) {
            return Promise.reject(e)
        }
    }

    /**
     * Finds onw entry by email and return the result
     *
     * @throws NotFoundError
     */
    async findOneByEmail(email: string): Promise<T> {
        try {
            return (this.model.query().findOne({ email }) as unknown) as Promise<T>
        } catch (e) {
            return Promise.reject(e)
        }
    }

    /**
     * Created a entry and return it
     */
    async create(data: any): Promise<T> {
        try {
            return (this.model
                .query()
                .insertAndFetch(data) as unknown) as Promise<T>
        } catch (e) {
            return Promise.reject(e)
        }
    }

    /**
     * Updates a entry and return it
     */
    async update(id: number, data: any): Promise<T> {
        return (this.model
            .query()
            .patchAndFetchById(id, data) as unknown) as Promise<T>
    }

    /**
     * Soft-deletes a entry and return it
     */
    remove(id: number) {
        return this.update(id, {
            deleted_at: raw('CURRENT_TIMESTAMP'),
        })
    }
}
