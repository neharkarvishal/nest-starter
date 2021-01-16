/* eslint-disable no-use-before-define */
import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    ParseIntPipe,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { CrudController } from '../base/crud'
import { CreateUserDto, UpdateUserDto, User } from './user.model'
import { UsersService } from './users.service'

@Controller(UsersController.path)
@ApiTags(UsersController.name)
export class UsersController extends CrudController<User> {
    static path = 'users'

    constructor(readonly service: UsersService) {
        super(service)
    }

    @ApiOperation({
        summary: 'Create a User',
        description: 'Create a new User and store it in database',
    })
    @Post()
    async create(@Body() user: CreateUserDto) {
        return this.service.create(user)
    }

    @ApiOperation({
        summary: 'Update one users by id',
        description: 'Update one users by id',
    })
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatedUser: UpdateUserDto,
    ) {
        return this.service.update(id, updatedUser)
    }

    @ApiOperation({
        summary: 'Delete one users by id',
        description: 'Delete one users by id',
    })
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.service.remove(id)
    }
}
