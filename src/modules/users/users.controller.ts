/* eslint-disable no-use-before-define,@typescript-eslint/no-use-before-define */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CreateUserDto, UpdateUserDto } from 'src/modules/users/dto/user.dto'
import { UsersService } from 'src/modules/users/users.service'

@Controller('users')
@ApiTags(UsersController.name)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Get()
    findAll() {
        return this.usersService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id)
    }
}
