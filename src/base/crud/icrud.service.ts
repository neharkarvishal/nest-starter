import { Model, Page } from 'objection'

import { BaseModel } from '../../database/models/base.model'
import { IPagination } from './pagination'
import { PaginationParams } from './pagination-params'

export interface ICrudService<T> {
    findOne(id: string | number): Promise<T>

    // @ts-ignore
    findAll(filter?: PaginationParams<T>): Promise<Page<T>>
}
