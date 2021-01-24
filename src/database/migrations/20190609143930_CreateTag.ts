import * as Knex from 'knex'

const tableName = 'tags'

export async function up(knex: Knex) {
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').unsigned().primary()

        table.string('name').notNullable() // .unique()

        table.timestamps(true, true) // created_at, updated_at, useTimestamps, defaultToNow

        table.timestamp('deleted_at').nullable().defaultTo(null)
    })
}

export async function down(knex: Knex) {
    if (process.env.NODE_ENV !== 'production') {
        return knex.schema.dropTableIfExists(tableName)
    }

    return Promise.resolve()
}
