/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger'

import type { JSONSchema, Modifier } from 'objection'

import { BaseModel } from './base.model'

export class Tag extends BaseModel {
    static tableName = 'tags'

    @ApiProperty() name: string

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
