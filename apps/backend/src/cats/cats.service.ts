import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateCatDto } from 'apps/backend/src/cats/dto/create-cat.dto'
import { UpdateCatDto } from 'apps/backend/src/cats/dto/update-cat.dto'

import { CrudService } from 'libs/core/src'

import { getManager, Repository } from 'typeorm'

import { Cat } from './entities/cat.entity'

@Injectable()
export class CatsService extends CrudService<Cat> {
    constructor(@InjectRepository(Cat) private readonly catRepo: Repository<Cat>) {
        super(catRepo)
    }

    /* async clear() {
        let cleared = {}
        cleared = await getManager().query('DELETE FROM cats') // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        this.logger.log({ cleared })

        return cleared
    } */
}
