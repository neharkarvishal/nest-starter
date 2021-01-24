import { Global, Module } from '@nestjs/common'

import * as Knex from 'knex'
import { Model } from 'objection'

import { Tag } from '../tags/tag.model'
import { User } from '../users/user.model'

const models = [Tag, User]

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
        // eslint-disable-next-line @typescript-eslint/require-await
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

@Global()
@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
