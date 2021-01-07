import { Injectable } from '@nestjs/common'

import { NoteTag } from '../database/models/note-tag.model'

@Injectable()
export class NoteTagsService {
    constructor() {
        return null
    }

    create(props: Partial<NoteTag>) {
        return null
    }

    async delete(props: Partial<NoteTag>) {
        return null
    }

    deleteByNoteId(noteId: number) {
        return null
    }

    deleteByTagId(tagId: number) {
        return null
    }
}
