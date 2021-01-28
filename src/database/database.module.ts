import { Global, Module } from '@nestjs/common'

import { graphql } from 'graphql'
import * as Knex from 'knex'
import { Model } from 'objection'
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
                client: 'sqlite3',
                useNullAsDefault: true,
                connection: {
                    filename: './knex.sqlite',
                },
                debug: true,
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
