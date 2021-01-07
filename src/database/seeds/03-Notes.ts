import * as Knex from 'knex'

import { NoteModel } from '../models/note.model'

export async function seed(knex: Knex): Promise<any> {
    await NoteModel.query(knex).insert({
        text:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, ex.',
        themeId: 1,
    })
}