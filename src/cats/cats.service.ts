import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Cat } from 'src/cats/entities/cat.entity'
import { Repository } from 'typeorm'

import { CreateCatDto } from './dto/cat.dto'

@Injectable()
export class CatsService {
    constructor(@InjectRepository(Cat) private readonly catRepo: Repository<Cat>) {}

    async create(cat: CreateCatDto) {
        const newCat = new Cat()

        newCat.name = cat.name
        newCat.age = cat.age
        newCat.breed = cat.breed

        return this.catRepo.save(newCat)
    }

    async findAll(): Promise<Cat[]> {
        return this.catRepo.find()
    }

    async findOne(id: number): Promise<Cat> {
        return this.catRepo.findOne(id)
    }
}
