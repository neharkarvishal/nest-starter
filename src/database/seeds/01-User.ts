import * as Knex from 'knex'

import { User } from '../../users/user.model'

if (process.env.NODE_ENV === 'production') {
    throw new Error("Can't run seeds in production")
}

export async function seed(knex: Knex): Promise<any> {
    const users = [
        {
            username: 'admin',
            email: 'admin@demo.com',
            firstName: 'admin',
            lastName: 'user',
            isActive: true,
            password: '12345678',
        },
        {
            username: 'mod',
            email: 'mod@demo.com',
            firstName: 'mod',
            lastName: 'user',
            isActive: true,
            password: '12345678',
        },
        {
            username: 'superuser',
            email: 'superuser@demo.com',
            firstName: 'superuser',
            lastName: 'user',
            isActive: true,
            password: '12345678',
        },
    ]

    // eslint-disable-next-line no-restricted-syntax
    for await (const user of users) {
        await User.query(knex).insert(user)
    }
}
