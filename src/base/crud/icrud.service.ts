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
    count(filter?: FindManyOptions<T>)

    findAll(filter?: FindManyOptions<T>)

    findOne(
        id: string | number | FindOneOptions<T> | FindConditions<T>,
        options?: FindOneOptions<T>,
    )

    create(entity: DeepPartial<T>, ...options: any[])

    update(id: any, entity: QueryDeepPartialEntity<T>, ...options: any[])

    delete(id: any, ...options: any[])
}
