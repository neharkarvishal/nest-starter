import * as Knex from 'knex'

const tableName = 'user'

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary()

        table.string('username').notNullable().unique()

        table.string('email').notNullable().unique()

        table.string('password').notNullable()

        table.string('firstName').nullable()

        table.string('lastName').nullable()

        table.boolean('isActive').defaultTo(false)

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
