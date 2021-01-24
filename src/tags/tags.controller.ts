/* eslint-disable no-use-before-define */
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { CrudController } from '../base/crud'
import { CreateTagsDto, Tag, UpdateTagsDto } from './tag.model'
import { TagsService } from './tags.service'

@Controller(TagsController.path)
@ApiTags(TagsController.name)
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class TagsController extends CrudController<Tag> {
    static path = 'tags'

    constructor(readonly service: TagsService) {
        super(service)
    }

    @Post()
    async create(@Body() tag: CreateTagsDto) {
        return this.service.create(tag)
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatedTag: UpdateTagsDto,
    ) {
        return this.service.update(id, updatedTag)
    }
}
