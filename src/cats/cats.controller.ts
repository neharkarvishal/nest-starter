/* eslint-disable no-use-before-define */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CatsService } from './cats.service'
import { CreateCatDto } from './datum/create-cat.dto'
import { UpdateCatDto } from './datum/update-cat.dto'

@Controller(CatsController.path)
@ApiTags(CatsController.name)
export class CatsController {
    static path = 'cats'

    constructor(private readonly catsService: CatsService) {}

    @Post()
    create(@Body() createCatDto: CreateCatDto) {
        return this.catsService.create(createCatDto)
    }

    @Get()
    findAll() {
        return this.catsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.catsService.findOne(+id)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        return this.catsService.update(+id, updateCatDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.catsService.remove(+id)
    }
}
