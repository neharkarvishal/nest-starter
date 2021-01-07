import { Global, Module } from '@nestjs/common'

import { NoteTagsService } from './note-tags.service'
import { NotesController } from './notes.controller'
import { NotesService } from './notes.service'

@Global()
@Module({
    controllers: [NotesController],
    providers: [NotesService, NoteTagsService],
    exports: [NotesService, NoteTagsService],
})
export class NotesModule {}
