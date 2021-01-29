import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import * as bcrypt from 'bcrypt'
import { ModelClass } from 'objection'

import { CrudService } from '../base/crud'
import { CreateUserDto, UpdateUserDto, User } from './user.model'

@Injectable()
export class UsersService extends CrudService<User> {
    constructor(@Inject(User.name) readonly model: ModelClass<User>) {
        super(model)
    }

    async hashPassword(password: string) {
        return bcrypt.hash(password, 12)
    }

    async findOne(id: string | number) {
        const data = await this.model.query().findById(id).first()

        if (!data)
            return Promise.reject(
                new NotFoundException(`User with id ${id} not found`),
            )

        return data
    }

    async findOneByEmail(email: string) {
        const data = await this.model.query().findOne({ email })

        if (!data)
            return Promise.reject(
                new NotFoundException(`User with email ${email} not found`),
            )

        return data
    }

    async create(user: CreateUserDto) {
        return this.model.query().insertAndFetch(user)
    }

    async update(id: number, user: UpdateUserDto) {
        if (user?.password) user.password = await this.hashPassword(user.password) // eslint-disable-line no-param-reassign

        return this.model.query().patchAndFetchById(id, user)
    }
}
