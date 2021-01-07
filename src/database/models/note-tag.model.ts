import { BaseModel } from './base.model'

export class NoteTag extends BaseModel {
    static tableName = 'note_tags'

    noteId: number

    tagId: number
}
