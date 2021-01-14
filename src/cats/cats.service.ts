/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'

import { UserRepository } from '../users/datum/user.repository'
import { Cat } from './datum/cat.entity'
import { CatRepository } from './datum/cat.repository'

@Injectable()
export class CatsService extends TypeOrmCrudService<Cat> {
    constructor(
        @InjectRepository(CatRepository) public repo: CatRepository,
        @InjectRepository(UserRepository) public userRepo: UserRepository,
    ) {
        super(repo)
    }

    /**
     * User owning Cat database
     */
    async getUserByCatId(catId) {
        return this.userRepo.getUserByCatId(catId)
    }

    /**
     * Deletes all of the Cat records form database
     */
    async clear() {
        return this.repo.clearAll()
    }
}
