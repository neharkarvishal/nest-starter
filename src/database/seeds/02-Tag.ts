import * as Knex from 'knex'

import { Tag } from '../../tags/tag.model'

if (process.env.NODE_ENV === 'production') {
    throw new Error("Can't run seeds in production")
}

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
