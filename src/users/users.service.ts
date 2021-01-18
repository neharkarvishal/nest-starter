import { Inject, Injectable } from '@nestjs/common'

import { CrudService } from 'src/base/crud/crud.service'

import * as bcrypt from 'bcrypt'
import { ModelClass, raw } from 'objection'

import { User } from './user.model'

@Injectable()
export class UsersService extends CrudService<User> {
    constructor(@Inject(User.name) readonly model: ModelClass<User>) {
        super(model)
    }

    async hashPassword(password: string) {
        const hash = await bcrypt.hash(password, 12) // eslint-disable-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
        return hash // eslint-disable-line @typescript-eslint/no-unsafe-return
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
        if (user?.password) user.password = await this.hashPassword(user.password) // eslint-disable-line @typescript-eslint/no-unsafe-member-access,no-param-reassign

        return this.model.query().patchAndFetchById(id, user)
    }
}
