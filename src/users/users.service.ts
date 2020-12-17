import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'

import { User } from './datum/user.entity'
import { UserRepository } from './datum/user.repository'

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
    constructor(@InjectRepository(UserRepository) public repo: UserRepository) {
        super(repo)
    }

    /**
     * Deletes all of the Cat records form database
     */
    async clear() {
        return this.repo.clearAll()
    }
}
