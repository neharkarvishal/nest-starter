import { Model } from 'objection'

import { BaseModel } from './base.model'
import { Tag } from './tag.model'
import { Theme } from './theme'

export class Note extends BaseModel {
    static tableName = 'notes'

    text: string

    themeId: number

    theme: Theme

    tags: Tag[]

    static relationMappings = {
        theme: {
            modelClass: `${__dirname}/theme.model`,
            relation: Model.BelongsToOneRelation,
            join: {
                from: 'notes.themeId',
                to: 'themes.id',
            },
        },
        tags: {
            modelClass: `${__dirname}/tag.model`,
            relation: Model.ManyToManyRelation,
            join: {
                from: 'notes.id',
                through: {
                    from: 'note_tags.noteId',
                    to: 'note_tags.tagId',
                },
                to: 'tags.id',
            },
        },
    }
}
