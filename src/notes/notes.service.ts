import { Inject, Injectable } from '@nestjs/common'

import { ModelClass, transaction } from 'objection'

import { Note } from '../database/models/note.model'
import { NoteTagsService } from './note-tags.service'

@Injectable()
export class NotesService {
    constructor(
        private noteTagsService: NoteTagsService,
        @Inject(Note.name) private modelClass: ModelClass<Note>,
    ) {}

    findAll() {
        return this.modelClass.query()
    }

    findOne(id: number) {
        return this.modelClass.query().findById(id)
    }

    create(props: Partial<Note>) {
        return this.modelClass.query().insert(props).returning('*')
    }

    update(id: number, props: Partial<Note>) {
        return this.modelClass
            .query()
            .patch(props)
            .where({ id })
            .returning('*')
            .first()
    }

    delete(id: number) {
        return transaction(this.modelClass, async (_, trx) => {
            await this.noteTagsService.deleteByNoteId(id).transacting(trx)

            return this.modelClass
                .query()
                .delete()
                .where({ id })
                .returning('*')
                .first()
                .transacting(trx)
        })
    }

    unsetTheme(themeId: number) {
        return this.modelClass.query().patch({ themeId: null }).where({ themeId })
    }

    async addTag(noteId: number, tagId: number) {
        await this.noteTagsService.create({ noteId, tagId })
        return this.findOne(noteId)
    }

    async removeTag(noteId: number, tagId: number) {
        await this.noteTagsService.delete({ noteId, tagId })
        return this.findOne(noteId)
    }
}
