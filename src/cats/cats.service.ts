import { Injectable } from '@nestjs/common'

import { Cat } from 'src/cats/entities/cat.entity'

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = []

    create(cat: Cat) {
        this.cats.push(cat)
    }

    async findAll(): Promise<Cat[]> {
        return this.cats
    }

    async findOne(id: number): Promise<Cat> {
        if (this?.cats[id]) return this.cats[id]

        return Promise.reject(new Error('No Cats'))
    }
}
