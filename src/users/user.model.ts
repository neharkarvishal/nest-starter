import { PartialType as MappedPartialType } from '@nestjs/mapped-types'
import { ApiProperty, PartialType } from '@nestjs/swagger'

import {
    IsString,
    MinLength,
    IsNotEmpty,
    IsOptional,
    MaxLength,
    IsEmail,
    IsBoolean,
} from 'class-validator'
import type { JSONSchema, Modifiers } from 'objection'

import { BaseModel } from '../database/models/base.model'

interface IUser {
    username: string
    email: string
    firstName: string
    lastName: string
    isActive: boolean
    password: string
}

export class User extends BaseModel implements IUser {
    static tableName = 'users'

    username: string

    email: string

    firstName: string

    lastName: string

    isActive: boolean

    password: string

    // JSON schema is not the database schema! Nothing is generated based on this.
    // This is only used for validation. Whenever a model instance is created it is checked against this schema.
    static jsonSchema: JSONSchema = {
        type: 'object',
        required: ['username', 'email', 'password'],
        properties: {
            id: { type: 'integer', readOnly: true },
            username: { type: 'string', minLength: 3, maxLength: 255 },
            email: {
                type: 'string',
                minLength: 3,
                maxLength: 255,
                format: 'email',
            },
            password: { type: 'string', minLength: 8, maxLength: 255 },
            firstName: { type: 'string', minLength: 1, maxLength: 255 },
            lastName: { type: 'string', minLength: 1, maxLength: 255 },
            isActive: { type: 'boolean' },
        },
    }

    // Modifiers are reusable query snippets that can be used in various places.
    static modifiers: Modifiers = {
        // Our example modifier is a a semi-dumb fuzzy name match. We split the name into pieces using whitespace
        // and then try to partially match each of those pieces to both the `firstName` and the `lastName` fields.

        searchByName(query, name: string) {
            // This `where` simply creates parentheses so that other `where` statements don't get mixed with the these.

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            query.where((q) => {
                // eslint-disable-next-line no-restricted-syntax
                for (const namePart of name.trim().split(/\s+/)) {
                    // eslint-disable-next-line no-restricted-syntax
                    for (const column of ['firstName', 'lastName']) {
                        // eslint-disable-next-line @typescript-eslint/no-floating-promises
                        q.orWhereRaw('lower(??) like ?', [
                            column,
                            `${namePart.toLowerCase()}%`,
                        ])
                    }
                }
            })
        },
    }
}

export class CreateUserDto implements IUser {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(36)
    username: string

    @IsEmail()
    @IsNotEmpty()
    @MinLength(2)
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    firstName: string

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    lastName: string

    @IsBoolean()
    isActive: boolean
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
