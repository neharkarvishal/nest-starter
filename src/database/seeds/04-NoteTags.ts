import * as Knex from 'knex'

import { NoteTag } from '../models/note-tag.model'

export async function seed(knex: Knex): Promise<any> {
    await NoteTag.query(knex).insert({
        noteId: 1,
        tagId: 1,
    })
}
