import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common'

import { Theme } from '../database/models/theme'
import { ThemesService } from './themes.service'

@Controller('themes')
export class ThemesController {
    constructor(private themesService: ThemesService) {}

    @Get()
    async findAll() {
        return this.themesService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id', new ParseIntPipe()) id: number) {
        return this.themesService.findOne(id)
    }

    @Post()
    async create(@Body() props: Partial<Theme>) {
        return this.themesService.create(props)
    }

    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        return this.themesService.delete(id)
    }

    @Put(':id')
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() props: Partial<Theme>,
    ) {
        return this.themesService.update(id, props)
    }
}
