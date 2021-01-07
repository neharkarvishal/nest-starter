import { Global, Module } from '@nestjs/common'

import * as Knex from 'knex'
import { knexSnakeCaseMappers, Model } from 'objection'

import { NoteTag } from './models/note-tag.model'
import { Note } from './models/note.model'
import { Tag } from './models/tag.model'
import { Theme } from './models/theme'

const models = [Tag, Note, Theme, NoteTag]

const modelProviders = models.map((model) => {
    return {
        provide: model.name,
        useValue: model,
    }
})

const providers = [
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
                ...knexSnakeCaseMappers(),
            })

            Model.knex(knex)
            return knex
        },
    },
]

@Global()
@Module({
    providers: [...providers],
    exports: [...providers],
})
export class DatabaseModule {}
