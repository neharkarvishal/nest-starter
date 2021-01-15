import { Inject, Injectable } from '@nestjs/common'

import { CrudService } from 'src/base/crud/crud.service'

import { ModelClass } from 'objection'

import { User } from './user.model'

@Injectable()
export class UsersService extends CrudService<User> {
    constructor(@Inject(User.name) readonly model: ModelClass<User>) {
        super(model)
    }

    async create(user) {
        return this.model.query().insertAndFetch(user)
    }

    async update(id: number, user) {
        return this.model.query().patchAndFetchById(id, user)
    }

    async remove(id: number) {
        return Promise.resolve(`This action removes a #${id} user`)
    }
}
