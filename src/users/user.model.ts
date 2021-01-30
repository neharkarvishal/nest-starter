/* eslint-disable @typescript-eslint/no-floating-promises,no-restricted-syntax */
import * as bcrypt from 'bcrypt'
import type { JSONSchema, Modifiers, PartialModelObject } from 'objection'
import { ModelObject, QueryContext } from 'objection'

import { BaseModel } from '../database/models/base.model'
import { IUser } from './user.interface'

/**
 * User Model
 */
export class User extends BaseModel implements IUser {
    static tableName = 'users'

    username!: string

    email!: string

    firstName?: string

    lastName?: string

    isActive!: boolean

    password!: string

    static isTenantSpecific = true

    static virtualAttributes = ['fullName']

    fullName() {
        if (this.firstName && this.lastName)
            return `${this.firstName} ${this.lastName}`

        return ''
    }

    /**
     * JSON schema is not the database schema! Nothing is generated based on this.
     * This is only used for validation. Whenever a model instance is created it is checked against this schema.
     */
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
            fullName: { type: 'string' },
            lastName: { type: 'string', minLength: 1, maxLength: 255 },
            isActive: { type: 'boolean' },
            deleted_at: {
                anyOf: [{ type: 'string', format: 'date' }, { type: 'null' }],
            },
        },
    }

    /**
     * Modifiers are reusable query snippets that can be used in various places.
     */
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

    async hashPassword(password: string) {
        const hash = await bcrypt.hash(password, 12)
        return hash
    }

    async $beforeInsert(queryContext: QueryContext) {
        await super.$beforeInsert(queryContext)
        this.password = await this.hashPassword(this.password)
    }
}

/**
 * The `ModelObject` generic gives you a clean interface that can be used on
 * the frontend, without any of the objection Model class properties or methods.
 */
export type UserShape = ModelObject<User>

/**
 * The `PartialModelObject` generic gives you a clean interface that can be used on
 * the frontend, without any of the objection Model class properties or methods.
 */
export type PartialUserShape = PartialModelObject<User>
