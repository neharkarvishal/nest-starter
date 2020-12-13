/* eslint-disable @typescript-eslint/no-use-before-define,no-use-before-define */
import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'

import { CreateUserDto, UpdateUserDto } from 'src/modules/users/dto/user.dto'
import { User } from 'src/modules/users/entities/user.entity'
import { UsersService } from 'src/modules/users/users.service'

@ApiTags(UsersController.name)
@Crud({
    model: {
        type: User,
    },
    // dto: {
    //     create: CreateUserDto,
    //     update: UpdateUserDto,
    // },
})
@Controller('users')
export class UsersController implements CrudController<User> {
    constructor(public service: UsersService) {}
}
