/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model } from 'objection'
import type { JSONSchema, Modifier } from 'objection'

import { BaseModel } from './base.model'

export class Tag extends Model {
    static tableName = 'tags'

    id!: number

    createdAt?: Date

    updatedAt?: Date

    deletedAt?: Date | null

    name: string

    // JSON schema is not the database schema! Nothing is generated based on this.
    // This is only used for validation. Whenever a model instance is created it is checked against this schema.
    static jsonSchema: JSONSchema = {
        type: 'object',
        required: ['name'],
        properties: {
            id: { type: 'integer' },
            name: { type: 'string', minLength: 2, maxLength: 255 },
        },
    }
}
