/* eslint-disable no-use-before-define */
import { Controller, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'
import { CrudOptions } from '@nestjsx/crud/lib/interfaces'

import { Cat } from '../cats/datum/cat.entity'
import { CreateUserDto, GetUserResponseDto, UpdateUserDto } from './datum/user.dto'
import { User } from './datum/user.entity'
import { UsersService } from './users.service'

@ApiTags(UsersController.name)
@Controller(UsersController.path)
@Crud(UsersController.crudOptions)
export class UsersController implements CrudController<User> {
    constructor(public service: UsersService) {}

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

    @ApiOperation({ summary: 'Get the User of provided email' })
    @Get('/email/:email')
    async findByEmail(@Param('email') email: string) {
        return this.service.getUserByEmail(email)
    }

    @ApiOperation({ summary: 'Delete all User' })
    @Post('/clear')
    async clear() {
        return this.service.clear()
    }
}
