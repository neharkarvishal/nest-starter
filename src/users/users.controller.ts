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
        summary: 'Get one record by email',
        description: 'Get one record from database with provided by email',
    })
    @Get()
    async findOneByEmail(@Query() email: string) {
        return this.service.findOneByEmail(email)
    }

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
