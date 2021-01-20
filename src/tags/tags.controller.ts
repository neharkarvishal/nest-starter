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
import { ApiTags } from '@nestjs/swagger'

import { CreateTagsDto, UpdateTagsDto } from './tag.model'
import { TagsService } from './tags.service'

@Controller(TagsController.path)
@ApiTags(TagsController.name)
@UseGuards(AuthGuard('jwt'))
export class TagsController {
    static path = 'tags'

    constructor(readonly service: TagsService) {}

    @Get()
    async findAll() {
        return this.service.findAll()
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.findOne(id)
    }

    @Post()
    async create(@Body() tag: CreateTagsDto) {
        return this.service.create(tag)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.delete(id)
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatedTag: UpdateTagsDto,
    ) {
        return this.service.update(id, updatedTag)
    }
}
