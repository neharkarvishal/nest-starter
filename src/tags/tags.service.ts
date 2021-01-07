import { Inject, Injectable } from '@nestjs/common'

import { ModelClass, transaction } from 'objection'

import { Tag } from '../database/models/tag.model'
import { NoteTagsService } from '../notes/note-tags.service'

@Injectable()
export class TagsService {
    constructor(
        private noteTagsService: NoteTagsService,
        @Inject(Tag.name) private modelClass: ModelClass<Tag>,
    ) {}

    findAll() {
        return this.modelClass.query()
    }

    findOne(id: number) {
        return this.modelClass.query().findById(id)
    }

    create(props: Partial<Tag>) {
        return this.modelClass.query().insert(props).returning('*')
    }

    update(id: number, props: Partial<Tag>) {
        return this.modelClass
            .query()
            .patch(props)
            .where({ id })
            .returning('*')
            .first()
    }

    delete(id: number) {
        return transaction(this.modelClass, async (_, trx) => {
            await this.noteTagsService.deleteByTagId(id).transacting(trx)

            return this.modelClass
                .query()
                .deleteById(id)
                .returning('*')
                .first()
                .transacting(trx)
        })
    }
}
