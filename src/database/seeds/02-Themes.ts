import * as Knex from 'knex'

import { ThemeModel } from '../models/theme.model'

export async function seed(knex: Knex): Promise<any> {
    await ThemeModel.query(knex).insert({
        name: 'Dracula',
        fontSize: 14,
        fontFamily: 'Code Saver',
        background: '#282a36',
        foreground: '#f8f8f2',
    })
}
