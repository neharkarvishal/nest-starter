import * as Knex from 'knex'

const tableName = 'tag'

export async function up(knex: Knex) {
    await knex.schema.table(tableName, (table) => {
        table.string('test').nullable()
    })
}

export async function down(knex: Knex) {
    if (process.env.NODE_ENV !== 'production') {
        return knex.schema.dropTableIfExists(tableName)
    }

    return Promise.resolve()
}
