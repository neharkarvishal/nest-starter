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

import { CreateUserDto, UpdateUserDto } from './user.model'
import { UsersService } from './users.service'

@Controller(UsersController.path)
@ApiTags(UsersController.name)
export class UsersController {
    static path = 'users'

    constructor(private readonly service: UsersService) {}

    @ApiOperation({
        summary: 'Create a User',
        description: 'Create a new User and store it in database',
    })
    @Post()
    async create(@Body() user: CreateUserDto) {
        return this.service.create(user)
    }

    @ApiOperation({
        summary: 'Get all of the users',
        description: 'Get all of the users',
    })
    @Get()
    async findAll() {
        return this.service.findAll()
    }

    @ApiOperation({
        summary: 'Get one users by id',
        description: 'Get one users by id',
    })
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.findOne(id)
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
