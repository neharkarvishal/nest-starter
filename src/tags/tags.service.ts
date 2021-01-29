import { BadRequestException, Inject, Injectable } from '@nestjs/common'

import { ModelClass } from 'objection'

import { CrudService } from '../base/crud'
import { CreateTagsDto, Tag, UpdateTagsDto } from './tag.model'

@Injectable()
export class TagsService extends CrudService<Tag> {
    constructor(@Inject(Tag.name) readonly model: ModelClass<Tag>) {
        super(model)
    }

    /**
     * Create a Tag
     */
    async create(input: CreateTagsDto) {
        const tag = await this.findOne({ name: input.name })

        if (tag)
            return Promise.reject(
                new BadRequestException([`Duplicate tag name: ${tag.name}`]),
            )

        return super.create(input)
    }

    /**
     * Update a Tag
     */
    async update(id: number, input: UpdateTagsDto) {
        const tag = await this.findOne({ name: input.name })

        if (tag)
            return Promise.reject(
                new BadRequestException([`Duplicate tag name: ${tag.name}`]),
            )

        return super.update(id, input)
    }
}
