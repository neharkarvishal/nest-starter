import { Inject, Injectable } from '@nestjs/common'
import { CrudRequest } from '@nestjsx/crud'

import { ModelClass } from 'objection'

import { User } from '../database/models/user.model'
import { UserDto, UpdateUserDto } from './user.dto'

@Injectable()
export class UsersService {
    constructor(@Inject(User.name) readonly model: ModelClass<User>) {}

    async findAll() {
        return this.model.query()
    }

    /*
    create(createUserDto: UserDto) {
        return 'This action adds a new user'
    }

    findOne(id: number) {
        return `This action returns a #${id} user`
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`
    }

    remove(id: number) {
        return `This action removes a #${id} user`
    } */
}
