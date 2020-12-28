import {
    DeepPartial,
    DeleteResult,
    FindConditions,
    FindManyOptions,
    FindOneOptions,
    UpdateResult,
} from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export interface IPagination<T> {
    /**
     * Items included in the current listing
     */
    readonly items: T[]

    /**
     * Total number of available items
     */
    readonly total: number
}

export interface ICrudService<T> {
    count(filter?: FindManyOptions<T>): Promise<number>

    findAll(filter?: FindManyOptions<T>): Promise<IPagination<T>>

    findOne(
        id: string | number | FindOneOptions<T> | FindConditions<T>,
        options?: FindOneOptions<T>,
    ): Promise<T>

    create(entity: DeepPartial<T>, ...options: any[]): Promise<T>

    update(
        id: any,
        entity: QueryDeepPartialEntity<T>,
        ...options: any[]
    ): Promise<UpdateResult | T>

    delete(id: any, ...options: any[]): Promise<DeleteResult>
}
