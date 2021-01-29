import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
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

    /**
     * Create a Tag
     */
    @Post()
    async create(@Body() input: CreateTagsDto) {
        const data = await this.service.create(input)

        return {
            data,
            statusCode: HttpStatus.CREATED,
        }
    }

    /**
     * Update a Tag
     */
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() input: UpdateTagsDto,
    ) {
        const data = await this.service.update(id, input)

        return {
            data,
            statusCode: !data ? HttpStatus.NO_CONTENT : HttpStatus.OK,
        }
    }
}
