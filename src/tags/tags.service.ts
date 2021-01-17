import { Inject, Injectable } from '@nestjs/common'

import { ModelClass, transaction } from 'objection'

import { Tag } from './tag.model'

@Injectable()
export class TagsService {
    constructor(@Inject(Tag.name) readonly tag: ModelClass<Tag>) {}

    async findAll() {
        return this.tag.query()
    }

    async findOne(id: number) {
        return this.tag.query().findById(id)
    }

    async create(tag) {
        return this.tag.query().insert(tag).returning('*')
    }

    async update(id: number, tag) {
        return this.tag.query().patch(tag).where({ id }).returning('*').first()
    }

    async delete(id: number) {
        return transaction(this.tag, async (_, trx) => {
            return this.tag
                .query()
                .deleteById(id)
                .returning('*')
                .first()
                .transacting(trx)
        })
    }
}
