import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'

import { CreateUserDto, UpdateUserDto } from 'src/modules/users/dto/user.dto'
import { User } from 'src/modules/users/entities/user.entity'

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
    constructor(@InjectRepository(User) public repo) {
        super(repo)
    }
}
