import { Global, Module } from '@nestjs/common'

import { graphql } from 'graphql'
import * as Knex from 'knex'
import { knexSnakeCaseMappers, Model } from 'objection'
import { builder as graphQlBuilder } from 'objection-graphql'

import { Tag } from '../tags/tag.model'
import { User } from '../users/user.model'

const models = [Tag, User]

export const graphQlSchema = graphQlBuilder().allModels(models).build()

export const modelProviders = models.map((model) => {
    return {
        provide: model.name,
        useValue: model,
    }
})

export const databaseProviders = [
    ...modelProviders,
    {
        provide: 'KnexConnection',
        useFactory: async () => {
            const knex = Knex({
                // @ts-ignore
                debug: true,
                connection: process.env.DATABASE_URL,
                useNullAsDefault: true,
                client: 'pg',
            })

            Model.knex(knex)
            return knex
        },
    },
]

/**
 * Database module
 */
@Global()
@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
