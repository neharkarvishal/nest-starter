/* eslint-disable no-use-before-define */
import { Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Crud, CrudController, CrudAuth } from '@nestjsx/crud'
import { CrudOptions } from '@nestjsx/crud/lib/interfaces'

import { Cat } from '../cats/datum/cat.entity'
import { CreateUserDto, GetUserResponseDto, UpdateUserDto } from './datum/user.dto'
import { User } from './datum/user.entity'
import { UsersService } from './users.service'

@Controller(UsersController.path)
@ApiTags(UsersController.name)
@Crud(UsersController.crudOptions)
export class UsersController implements CrudController<User> {
    static path = 'users'

    static crudOptions: CrudOptions = {
        model: {
            type: User,
        },
        dto: {
            create: CreateUserDto,
            replace: CreateUserDto,
            update: UpdateUserDto,
        },
        serialize: {
            create: GetUserResponseDto,
            delete: GetUserResponseDto,
            get: GetUserResponseDto,
            update: GetUserResponseDto,
        },
        query: {
            alwaysPaginate: true,
            join: {
                cats: {
                    eager: false,
                    exclude: Cat.exclude,
                },
            },
        },
    }

    constructor(public service: UsersService) {}

    @ApiOperation({ summary: 'Delete all User' })
    @Post('/clear')
    async clear() {
        return this.service.clear()
    }
}
