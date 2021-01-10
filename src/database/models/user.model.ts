/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-floating-promises,no-restricted-syntax */
import { Model } from 'objection'
import type { JSONSchema, Modifiers, AnyQueryBuilder } from 'objection'

import { BaseModel } from './base.model'

export class User extends Model {
    static tableName = 'users'

    id!: number

    createdAt?: Date

    updatedAt?: Date

    deletedAt?: Date | null

    username: string

    email: string

    password: string

    firstName: string

    lastName: string

    isActive: boolean

    // JSON schema is not the database schema! Nothing is generated based on this.
    // This is only used for validation. Whenever a model instance is created it is checked against this schema.
    static jsonSchema: JSONSchema = {
        type: 'object',
        required: ['username', 'email', 'displayName', 'password'],
        properties: {
            id: { type: 'integer' },
            username: { type: 'string', minLength: 3, maxLength: 255 },
            email: { type: 'string', minLength: 3, maxLength: 255 },
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

            query.where((q) => {
                for (const namePart of name.trim().split(/\s+/)) {
                    for (const column of ['firstName', 'lastName']) {
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
