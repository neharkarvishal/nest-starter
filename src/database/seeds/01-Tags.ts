import * as Knex from 'knex'

import { Tag } from '../models/tag.model'

export async function seed(knex: Knex): Promise<any> {
    await Tag.query(knex).insert({
        name: 'Workout',
    })
    await Tag.query(knex).insert({
        name: 'Food',
    })
    await Tag.query(knex).insert({
        name: 'Diary',
    })
    await Tag.query(knex).insert({
        name: 'Cinema',
    })
    await Tag.query(knex).insert({
        name: 'Books',
    })
}
