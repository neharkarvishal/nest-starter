import { PartialType } from '@nestjs/swagger'

import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import type { JSONSchema, ModelObject, PartialModelObject } from 'objection'

import { BaseModel } from '../database/models/base.model'

interface ITag {
    name: string
}

export class Tag extends BaseModel implements ITag {
    static tableName = 'tags'

    name!: string

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

// The `ModelObject` generic gives you a clean interface that can be used on the frontend, without any of the objection Model class properties or methods.
export type TagShape = ModelObject<Tag>
export type PartialTagShape = PartialModelObject<Tag>

export class CreateTagsDto implements ITag {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(36)
    name!: string
}

export class UpdateTagsDto extends PartialType(CreateTagsDto) {}
