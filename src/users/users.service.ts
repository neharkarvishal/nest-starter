import { Inject, Injectable } from '@nestjs/common'

import { ModelClass } from 'objection'

import { User } from './user.model'

@Injectable()
export class UsersService {
    constructor(@Inject(User.name) private user: ModelClass<User>) {}

    async create(user) {
        return this.user.query().insertAndFetch(user)
    }

    async findAll() {
        return this.user.query()
    }

    async findOne(id: number) {
        return this.user.query().findById(id).first() // .throwIfNotFound()
    }

    async update(id: number, user) {
        return this.user.query().patchAndFetchById(id, user)
    }

    async remove(id: number) {
        return Promise.resolve(`This action removes a #${id} user`)
    }
}
