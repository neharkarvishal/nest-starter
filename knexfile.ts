import 'dotenv/config'
import * as Knex from 'knex'
import { knexSnakeCaseMappers } from 'objection'

module.exports = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './knex.sqlite',
    },
    debug: true,
    migrations: {
        directory: './src/database/migrations',
        stub: './src/database/migration.stub',
    },
    seeds: {
        directory: './src/database/seeds',
        stub: './src/database/seed.stub',
    },
    ...knexSnakeCaseMappers(),
} as Knex.Config
