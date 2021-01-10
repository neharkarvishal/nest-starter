import * as Knex from 'knex'

const tableName = 'tags'

export async function up(knex: Knex) {
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').primary()

        table.string('name').notNullable().unique()

        // table.integer('note_id').unsigned().references('id').inTable('notes')

        // table.unique(['tag_id', 'note_id'])

        table
            .timestamp('createdAt')
            .notNullable()
            // .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .defaultTo(knex.fn.now())

        table
            .timestamp('updatedAt')
            .notNullable()
            // .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            .defaultTo(knex.fn.now())

        table.timestamp('deletedAt').nullable().defaultTo(null)
    })
}

export async function down(knex: Knex) {
    if (process.env.NODE_ENV !== 'production') {
        return knex.schema.dropTable(tableName)
    }

    return Promise.resolve()
}
