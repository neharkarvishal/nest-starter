import { ApiProperty } from '@nestjs/swagger'

import {
    Model,
    ModelOptions,
    QueryContext,
    snakeCaseMappers,
    ColumnNameMappers,
    mixin,
} from 'objection'
import { DBErrors } from 'objection-db-errors'
import visibilityPlugin from 'objection-visibility'

export class BaseModel extends mixin(Model, [visibilityPlugin, DBErrors]) {
    @ApiProperty({ example: '2000-01-01T12:00:00.000Z' })
    createdAt?: Date

    @ApiProperty({ example: '2000-01-01T12:00:00.000Z' })
    updatedAt?: Date

    @ApiProperty({ example: '2000-01-01T12:00:00.000Z' })
    deletedAt?: Date | null

    // async $beforeInsert(queryContext: QueryContext) {
    //     await super.$beforeInsert(queryContext)
    //
    //     this.createdAt = new Date()
    //     this.updatedAt = new Date()
    // }
    //
    // async $beforeUpdate(opt: ModelOptions, queryContext: QueryContext) {
    //     await super.$beforeUpdate(opt, queryContext)
    //
    //     this.updatedAt = new Date()
    // }
}
