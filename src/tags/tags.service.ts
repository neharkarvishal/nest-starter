/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common'
import { CrudRequest } from '@nestjsx/crud'

import { ModelClass, transaction } from 'objection'

import { Tag } from '../database/models/tag.model'

@Injectable()
export class TagsService {
    constructor(@Inject(Tag.name) private modelClass: ModelClass<Tag>) {}

    async findAll({ parsed, options }: CrudRequest) {
        return this.modelClass.query()
    }

    async findOne({ parsed, options }: CrudRequest, id: number) {
        return this.modelClass.query().findById(id)
    }

    async create({ parsed, options }: CrudRequest, props: Partial<Tag>) {
        return this.modelClass.query().insert(props).returning('*')
    }

    async update(
        { parsed, options }: CrudRequest,
        id: number,
        props: Partial<Tag>,
    ) {
        return this.modelClass
            .query()
            .patch(props)
            .where({ id })
            .returning('*')
            .first()
    }

    async delete({ parsed, options }: CrudRequest, id: number) {
        return transaction(this.modelClass, async (_, trx) => {
            return this.modelClass
                .query()
                .deleteById(id)
                .returning('*')
                .first()
                .transacting(trx)
        })
    }
}
