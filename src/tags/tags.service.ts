import { BadRequestException, Inject, Injectable } from '@nestjs/common'

import { ModelClass } from 'objection'

import { CrudService } from '../base/crud'
import { CreateTagsDto, Tag } from './tag.model'

@Injectable()
export class TagsService extends CrudService<Tag> {
    constructor(@Inject(Tag.name) readonly model: ModelClass<Tag>) {
        super(model)
    }

    async create(data: CreateTagsDto) {
        const tag = await this.findOne({ name: data.name })

        if (tag)
            return Promise.reject(
                new BadRequestException([`Duplicate tag name: ${tag.name}`]),
            )

        return super.create(data)
    }
}
