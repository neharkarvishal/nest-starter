import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateCatDto, UpdateCatDto } from 'src/modules/cats/dto/cat.dto'
import { Cat } from 'src/modules/cats/entities/cat.entity'

import { Repository } from 'typeorm'

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

    async update(id: number, updateCatDto: UpdateCatDto) {
        return `This action updates a #${id} cat`
    }

    async remove(id: number) {
        return `This action removes a #${id} cat`
    }
}
