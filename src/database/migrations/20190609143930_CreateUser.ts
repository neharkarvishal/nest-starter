import * as Knex from 'knex'

import { accountStatus, defaultAccountStatus } from '../helper'

const tableName = 'users'

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary()

        table.string('username').notNullable().unique()

        table.string('email').notNullable().unique()

        table.string('password').notNullable()

        table.string('firstName').nullable()

        table.string('lastName').nullable()

        table.boolean('isActive').defaultTo(false)

        table.specificType('roles', 'text ARRAY').defaultTo(['user'])

        table
            .enu('accountStatus', accountStatus, {
                useNative: true, // creates native db enum eg. CREATE TYPE mood AS ENUM ('sad', 'happy')
                enumName: 'accountStatus',
            })
            .defaultTo(defaultAccountStatus)

        table.timestamp('lastLogin').defaultTo(null)

        table.timestamps(true, true) // created_at, updated_at, useTimestamps, defaultToNow

        table.timestamp('deleted_at').nullable().defaultTo(null)
    })
}

export async function down(knex: Knex): Promise<any> {
    if (process.env.NODE_ENV !== 'production') {
        return knex.schema.dropTableIfExists(tableName)
    }

    return Promise.resolve()
}
