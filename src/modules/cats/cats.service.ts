import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateCatDto, UpdateCatDto } from 'src/modules/cats/dto/cat.dto'
import { Cat } from 'src/modules/cats/entities/cat.entity'

import { getManager, Repository } from 'typeorm'

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cat) private readonly catRepo: Repository<Cat>,
        private logger: Logger,
    ) {}

    async create(cat: CreateCatDto) {
        const newCat = new Cat()

        newCat.name = cat.name
        newCat.age = cat.age
        newCat.breed = cat.breed

        const saved = await this.catRepo.save(newCat)
        this.logger.log({ saved })

        return saved
    }

    async findAll(): Promise<Cat[]> {
        return this.catRepo.find()
    }

    async findOne(id: number): Promise<Cat> {
        return this.catRepo.findOne(id)
    }

    async update(id: number, updateCatDto: UpdateCatDto) {
        const updated = await this.catRepo.update(id, updateCatDto)
        this.logger.log({ updated })

        return updated
    }

    async remove(id: number) {
        const removed = this.catRepo.softDelete(id)
        this.logger.log({ removed })

        return removed
    }

    async clear() {
        let cleared = {}
        cleared = await getManager().query('DELETE FROM cats') // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        this.logger.log({ cleared })

        return cleared
    }
}
