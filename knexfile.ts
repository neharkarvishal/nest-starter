/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */
import 'dotenv/config'
import * as Knex from 'knex'
import { knexSnakeCaseMappers } from 'objection'

module.exports = {
    // @ts-ignore
    debug: true,
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    client: 'pg',
    // pool: {
    //     min: 2,
    //     max: 10,
    // },
    migrations: {
        directory: './src/database/migrations',
        stub: './src/database/migration.stub',
    },
    seeds: {
        directory: './src/database/seeds',
        stub: './src/database/seed.stub',
    },
} as Knex.Config
