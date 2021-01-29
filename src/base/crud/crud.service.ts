import { ModelClass, raw } from 'objection'

import { BaseModel } from '../../database/models/base.model'
import { CreateTagsDto } from '../../tags/tag.model'
import { CreateUserDto } from '../../users/user.model'
import { ICrudService } from './crud.service.interface'
import { IPaginationResult, PaginationParams } from './pagination'

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
        const data = await this.model.query()

        return (data as unknown) as Promise<T[]>
    }

    /**
     * Finds paginated entries and return the result
     */
    async paginatedFindAll(paginationParams: PaginationParams<T>) {
        const { page = 0, pageSize = 3, order } = paginationParams
        const { results, total } = await this.model.query().page(page, pageSize)

        const data = {
            data: results,
            paging: {
                pageSize,
                page,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        }

        return (data as unknown) as Promise<IPaginationResult<T>>
    }

    /**
     * Finds one entry with where filter and return the result
     */
    async findOne(filter = {}) {
        const data = await this.model.query().findOne(filter)

        return (data as unknown) as Promise<T>
    }

    /**
     * Finds paginated entries and return the result
     */
    async findOneById(id: number) {
        const data = await this.model.query().findById(id).first()

        return (data as unknown) as Promise<T>
    }

    /**
     * Finds onw entry by email and return the result
     */
    async findOneByEmail(email: string) {
        const data = await this.model.query().findOne({ email })

        return (data as unknown) as Promise<T>
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
    async create(input: CreateUserDto | CreateTagsDto | T) {
        try {
            const data = await this.model
                .query()
                .insert(input as T)
                .returning('*')

            return (data as unknown) as Promise<T>
        } catch (e) {
            return Promise.reject(e)
        }
    }

    /**
     * Updates a entry and return it
     */
    async update(id: number, input: Partial<T>) {
        try {
            const data = await this.model
                .query()
                .patch(input)
                .where('id', id)
                .returning('*')

            return (data as unknown) as Promise<T>
        } catch (e) {
            return Promise.reject(e)
        }
    }
}
