import { IPaginationResult, PaginationParams } from './pagination'

/**
 * Interface to enforce on the CRUD services
 */
export interface ICrudService<T> {
    /**
     * findAll
     */
    findAll(): Promise<T[]>

    /**
     * findOneById
     */
    findOneById(id: number): Promise<T>

    /**
     * findOneByEmail
     */
    findOneByEmail(email: string): Promise<T>

    /**
     * paginatedFindAll
     */
    paginatedFindAll(
        paginationParams?: PaginationParams<T>,
    ): Promise<IPaginationResult<T>>

    /**
     * remove
     */
    remove(id: number): Promise<T>

    /**
     * create
     */
    create(data: T): Promise<T>

    /**
     * update
     */
    update(id: number, data: Partial<T>): Promise<T>
}
