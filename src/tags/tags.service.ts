/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common'

import { ModelClass, transaction } from 'objection'

import { Tag } from '../database/models/tag.model'

@Injectable()
export class TagsService {
    constructor(@Inject(Tag.name) readonly model: ModelClass<Tag>) {}

    async findAll() {
        return this.model.query()
    }

    async findOne(id: number) {
        return this.model.query().findById(id).throwIfNotFound()
    }

    async create(props: Partial<Tag>) {
        return this.model.query().insert(props).returning('*')
    }

    async update(id: number, props: Partial<Tag>) {
        return this.model.query().patch(props).where({ id }).returning('*').first()
    }

    async delete(id: number) {
        return transaction(this.model, async (_, trx) => {
            return this.model
                .query()
                .deleteById(id)
                .returning('*')
                .first()
                .transacting(trx)
        })
    }
}
