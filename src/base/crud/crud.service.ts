import { ModelClass, raw } from 'objection'

import { BaseModel } from '../../database/models/base.model'
import { CreateTagsDto, UpdateTagsDto } from '../../tags/tag.model'
import { CreateUserDto, UpdateUserDto } from '../../users/user.model'
import { IPagination, PaginationParams } from './pagination'

export interface ICrudService<T> {
    findAll(): Promise<T[]>

    findOneById(id: number): Promise<T>

    findOneByEmail(email: string): Promise<T>

    paginatedFindAll(
        paginationParams?: PaginationParams<T>,
    ): Promise<IPagination<T>>

    remove(id: number): Promise<T>

    create(data: T): Promise<T>

    update(id: number, data: Partial<T>): Promise<T>
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
     */
    async findAll() {
        return (this.model.query() as unknown) as Promise<T[]>
    }

    /**
     * Finds paginated entries and return the result
     */
    async paginatedFindAll(paginationParams: PaginationParams<T>) {
        const { page = 0, pageSize = 3, order } = paginationParams
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
    }

    /**
     * Finds one entry with where filter and return the result
     */
    async findOne(filter = {}) {
        return (this.model.query().findOne(filter) as unknown) as Promise<T>
    }

    /**
     * Finds paginated entries and return the result
     */
    async findOneById(id: number): Promise<T> {
        return (this.model.query().findById(id).first() as unknown) as Promise<T>
    }

    /**
     * Finds onw entry by email and return the result
     */
    async findOneByEmail(email: string): Promise<T> {
        return (this.model.query().findOne({ email }) as unknown) as Promise<T>
    }

    /**
     * Soft-deletes a entry and return it
     */
    async remove(id: number) {
        // @ts-ignore
        return this.update(id, {
            deleted_at: raw('CURRENT_TIMESTAMP'),
        })
    }

    /**
     * Created a entry and return it
     */
    async create(data: CreateUserDto | CreateTagsDto | T): Promise<T> {
        return (this.model
            .query()
            .insertAndFetch(data as T) as unknown) as Promise<T>
    }

    /**
     * Updates a entry and return it
     */
    async update(id: number, data: Partial<T>): Promise<T> {
        return (this.model
            .query()
            .patchAndFetchById(id, data) as unknown) as Promise<T>
    }
}
