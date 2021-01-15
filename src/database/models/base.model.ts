/* eslint-disable max-classes-per-file,@typescript-eslint/no-unused-vars */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

import {
    fn,
    mixin,
    Model,
    ModelOptions,
    QueryContext,
    RelationExpression,
} from 'objection'
import { DBErrors } from 'objection-db-errors'
import visibilityPlugin from 'objection-visibility'

import { CustomQueryBuilder } from './helpers'

export interface IBaseModel {
    id: number
    created_at: any
    updated_at: any
    deleted_at?: any
}

export class BaseModel
    extends mixin(Model, [visibilityPlugin, DBErrors])
    implements IBaseModel {
    static hidden = ['salt', 'password', 'created_at', 'updated_at', 'deleted_at'] // hidden fields to filter from query result

    QueryBuilderType!: CustomQueryBuilder<this> // custom query builder for pagination

    static QueryBuilder = CustomQueryBuilder

    @ApiProperty() id: number

    created_at: any

    updated_at: any

    deleted_at?: any | null

    // fetch data with relation mapping
    async fetchRelation(expression: RelationExpression<any>, options = {}) {
        if (this[expression.toString()]) return this

        await this.$fetchGraph(expression, options)
        return this
    }

    /*
    async $beforeUpdate(opt: ModelOptions, queryContext: QueryContext) {
        await super.$beforeUpdate(opt, queryContext)

        this.updated_at = new Date().toISOString() // fn.now()
    }

    async $beforeInsert(queryContext: QueryContext) {
        await super.$beforeInsert(queryContext)

        const date = fn.now() // new Date().toISOString()

        this.created_at = date
        this.updated_at = date
    }
    */
}
