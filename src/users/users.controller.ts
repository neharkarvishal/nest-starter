/* eslint-disable no-use-before-define,@typescript-eslint/no-unused-vars */
import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    UseInterceptors,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CrudRequest, CrudRequestInterceptor, ParsedRequest } from '@nestjsx/crud'

import { UserDto, UpdateUserDto } from './user.dto'
import { UsersService } from './users.service'

@Controller(UsersController.path)
@ApiTags(UsersController.name)
@UseInterceptors(CrudRequestInterceptor)
export class UsersController {
    static path = 'users'

    constructor(private readonly service: UsersService) {}

    @Get()
    async findAll() {
        return this.service.findAll()
    }

    /*
    @Post()
    create(@Body() createUserDto: UserDto) {
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
    */
}
