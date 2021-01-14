import 'dotenv/config'
import * as Knex from 'knex'

module.exports = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './database.sqlite',
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
} as Knex.Config
