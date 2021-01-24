import { Inject, Injectable } from '@nestjs/common'

import { ModelClass, transaction } from 'objection'

import { Tag } from './tag.model'
import { CrudService } from '../base/crud'

@Injectable()
export class TagsService extends CrudService<Tag> {
    constructor(@Inject(Tag.name) readonly model: ModelClass<Tag>) {
        super(model)
    }
}
