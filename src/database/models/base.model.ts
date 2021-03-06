import Objection, {
    raw,
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
    // hidden fields to filter from query result
    static hidden = [
        'salt',
        'password',
        'created_at',
        'updated_at',
        // 'deleted_at'
    ]

    // QueryBuilderType!: CustomQueryBuilder<this> // custom query builder for pagination

    static QueryBuilder = CustomQueryBuilder

    id!: number

    created_at: any

    updated_at: any

    deleted_at?: any | null

    // fetch data with relation mapping
    // eslint-disable-next-line @typescript-eslint/ban-types
    async fetchRelation(
        expression: string | Record<string, unknown>,
        options: Objection.FetchGraphOptions,
    ) {
        if (typeof expression === 'string' && expression.toString() in this) {
            // @ts-ignore
            if (this[expression.toString()]) return this
        }

        await this.$fetchGraph(expression, options)
        return this
    }

    async $beforeUpdate(opt: ModelOptions, queryContext: QueryContext) {
        await super.$beforeUpdate(opt, queryContext)

        this.updated_at = raw('CURRENT_TIMESTAMP') // new Date().toISOString() // fn.now()
    }
}
