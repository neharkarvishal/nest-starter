import * as Knex from 'knex'

const tableName = 'users'

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').primary()

        table.string('username').notNullable()

        table.string('email').notNullable()

        table.string('password').notNullable()

        table.string('firstName').nullable()

        table.string('lastName').nullable()

        table.boolean('isActive').defaultTo(false)

        table.timestamp('updatedAt').defaultTo(knex.fn.now())

        table.timestamp('createdAt').defaultTo(knex.fn.now())

        table.timestamp('deletedAt').nullable().defaultTo(null)
    })
}

export async function down(knex: Knex): Promise<any> {
    if (process.env.NODE_ENV !== 'production') {
        return knex.schema.dropTableIfExists('users')
    }

    return Promise.resolve()
}
