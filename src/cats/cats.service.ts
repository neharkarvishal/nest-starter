import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'

import { getManager } from 'typeorm'

import { Cat } from './datum/cat.entity'
import { CatRepository } from './datum/cat.repository'

@Injectable()
export class CatsService extends TypeOrmCrudService<Cat> {
    constructor(@InjectRepository(Cat) public repo: CatRepository) {
        super(repo)
    }

    /**
     * Deletes all of the Cat records form database
     */
    async clear() {
        return this.repo.clearAll()
    }
}
