import * as Knex from 'knex'

const tableName = 'tags'

export async function up(knex: Knex) {
    await knex.schema.table(tableName, (table) => {
        // table.integer('user_id').unsigned()
        //
        // table
        //     .foreign('user_id')
        //     .references('id')
        //     .inTable('users')
        //     .onUpdate('CASCADE')
        //     .onDelete('NO ACTION')
        //
        // table.unique(['id', 'user_id'])
    })
}

export async function down(knex: Knex) {
    if (process.env.NODE_ENV !== 'production') {
        // return knex.schema.dropTableIfExists(tableName)
    }

    return Promise.resolve()
}
