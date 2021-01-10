/* eslint-disable no-use-before-define,@typescript-eslint/no-unused-vars */
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseInterceptors,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import {
    CrudRequest,
    CrudRequestInterceptor,
    ParsedBody,
    ParsedRequest,
} from '@nestjsx/crud'

import { Tag } from '../database/models/tag.model'
import { CreateTagsDto, UpdateTagsDto, GetTagsResponseDto } from './tags.dto'
import { TagsService } from './tags.service'

@Controller(TagsController.path)
@ApiTags(TagsController.name)
@UseInterceptors(CrudRequestInterceptor)
export class TagsController {
    static path = 'tags'

    constructor(private service: TagsService) {}

    @Get()
    async findAll(@ParsedRequest() r: CrudRequest) {
        const { parsed, options } = r

        return this.service.findAll({ parsed, options })
    }

    @Get(':id')
    async findOne(
        @ParsedRequest() r: CrudRequest,
        @Param('id', ParseIntPipe) id: number,
    ) {
        const { parsed, options } = r

        return this.service.findOne({ parsed, options }, id)
    }

    @Post()
    async create(@ParsedRequest() r: CrudRequest, @Body() props: CreateTagsDto) {
        const { parsed, options } = r

        return this.service.create({ parsed, options }, props)
    }

    @Delete(':id')
    async delete(
        @ParsedRequest() r: CrudRequest,
        @Param('id', ParseIntPipe) id: number,
    ) {
        const { parsed, options } = r

        return this.service.delete({ parsed, options }, id)
    }

    @Put(':id')
    async update(
        @ParsedRequest() r: CrudRequest,
        @Param('id', ParseIntPipe) id: number,
        @Body() props: UpdateTagsDto,
    ) {
        const { parsed, options } = r

        return this.service.update({ parsed, options }, id, props)
    }
}
