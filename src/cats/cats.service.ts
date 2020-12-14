import { Injectable } from '@nestjs/common'

import { CreateCatDto } from './datum/create-cat.dto'
import { UpdateCatDto } from './datum/update-cat.dto'

@Injectable()
export class CatsService {
    create(createCatDto: CreateCatDto) {
        return 'This action adds a new cat'
    }

    findAll() {
        return `This action returns all cats`
    }

    findOne(id: number) {
        return `This action returns a #${id} cat`
    }

    update(id: number, updateCatDto: UpdateCatDto) {
        return `This action updates a #${id} cat`
    }

    remove(id: number) {
        return `This action removes a #${id} cat`
    }
}
