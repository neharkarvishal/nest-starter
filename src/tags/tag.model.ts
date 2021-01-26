import { PartialType as MappedPartialType } from '@nestjs/mapped-types'
import { ApiProperty, PartialType } from '@nestjs/swagger'

import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import type { JSONSchema } from 'objection'

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

export class CreateTagsDto implements ITag {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(36)
    name!: string
}

export class UpdateTagsDto extends PartialType(CreateTagsDto) {}
