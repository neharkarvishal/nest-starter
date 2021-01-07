import * as Knex from 'knex'

import { TagModel } from '../models/tag.model'

export async function seed(knex: Knex): Promise<any> {
    await TagModel.query(knex).insert({
        name: 'Workout',
    })
    await TagModel.query(knex).insert({
        name: 'Food',
    })
    await TagModel.query(knex).insert({
        name: 'Diary',
    })
    await TagModel.query(knex).insert({
        name: 'Cinema',
    })
    await TagModel.query(knex).insert({
        name: 'Books',
    })
}
