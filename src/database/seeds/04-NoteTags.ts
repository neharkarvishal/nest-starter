import * as Knex from 'knex'

import { NoteTagModel } from '../models/note-tag.model'

export async function seed(knex: Knex): Promise<any> {
    await NoteTagModel.query(knex).insert({
        noteId: 1,
        tagId: 1,
    })
}
