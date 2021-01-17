import { Inject, Injectable } from '@nestjs/common'

import { CrudService } from 'src/base/crud/crud.service'

import { ModelClass, raw } from 'objection'

import { User } from './user.model'

@Injectable()
export class UsersService extends CrudService<User> {
    constructor(@Inject(User.name) readonly model: ModelClass<User>) {
        super(model)
    }

    async findOne(id: string | number) {
        return this.model.query().findById(id).first().throwIfNotFound()
    }

    async findOneByEmail(email: string) {
        return this.model.query().findOne({ email }).throwIfNotFound()
    }

    async create(user) {
        return this.model.query().insertAndFetch(user)
    }

    async update(id: number, user) {
        return this.model.query().patchAndFetchById(id, user)
    }
}
