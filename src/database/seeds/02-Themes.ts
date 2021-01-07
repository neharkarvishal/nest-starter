import * as Knex from 'knex'

import { Theme } from '../models/theme'

export async function seed(knex: Knex): Promise<any> {
    await Theme.query(knex).insert({
        name: 'Dracula',
        fontSize: 14,
        fontFamily: 'Code Saver',
        background: '#282a36',
        foreground: '#f8f8f2',
    })
}
