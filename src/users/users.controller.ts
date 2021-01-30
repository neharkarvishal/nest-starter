import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    ParseIntPipe,
    Query,
    HttpStatus,
    UnauthorizedException,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { CrudController } from '../base/crud'
import { User } from './user.model'
import { UsersService } from './users.service'
import { CreateUserDto, UpdateUserDto } from './user.dto'

@Controller(UsersController.path)
@ApiTags(UsersController.name)
export class UsersController {
    static path = 'users'

    constructor(readonly service: UsersService) {}

    @ApiOperation({
        summary: 'Create a User',
        description: 'Create a new User and store it in database',
    })
    @Post()
    async create(@Body() input: CreateUserDto) {
        const data = await this.service.create(input)

        return {
            data,
            statusCode: HttpStatus.CREATED,
        }
    }

    @ApiOperation({
        summary: 'Update one users by id',
        description: 'Update one users by id',
    })
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() input: UpdateUserDto,
    ) {
        const data = await this.service.update(id, input)

        return {
            data,
            statusCode: !data ? HttpStatus.NO_CONTENT : HttpStatus.OK,
        }
    }
}
