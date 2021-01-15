import * as Knex from 'knex'

import { User } from '../models/user.model'

if (process.env.NODE_ENV === 'production') {
    throw new Error("Can't run seeds in production")
}

export async function seed(knex: Knex): Promise<any> {
    const admin = {
        username: 'admin',
        email: 'admin@demo.com',
        firstName: 'admin',
        lastName: 'admin',
        isActive: true,
        password: '12345678',
    }

    await User.query(knex).insert(admin)
}
