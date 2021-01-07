import { Inject, Injectable } from '@nestjs/common'

import { ModelClass, transaction } from 'objection'

import { Theme } from '../database/models/theme'
import { NotesService } from '../notes/notes.service'

@Injectable()
export class ThemesService {
    constructor(
        private noteService: NotesService,
        @Inject(Theme.name) private modelClass: ModelClass<Theme>,
    ) {}

    findAll() {
        return this.modelClass.query()
    }

    findOne(id: number) {
        return this.modelClass.query().findById(id)
    }

    create(props: Partial<Theme>) {
        return this.modelClass.query().insert(props).returning('*')
    }

    update(id: number, props: Partial<Theme>) {
        return this.modelClass
            .query()
            .patch(props)
            .where({ id })
            .returning('*')
            .first()
    }

    delete(id: number) {
        return transaction(this.modelClass, async (_, trx) => {
            await this.noteService.unsetTheme(id).transacting(trx)

            return this.modelClass
                .query()
                .delete()
                .where({ id })
                .returning('*')
                .first()
                .transacting(trx)
        })
    }
}
