/* eslint-disable no-use-before-define */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CatsService } from 'apps/backend/src/cats/cats.service'
import { CreateCatDto } from 'apps/backend/src/cats/dto/create-cat.dto'
import { UpdateCatDto } from 'apps/backend/src/cats/dto/update-cat.dto'

import { CrudController } from 'libs/core/src'

import { Cat } from './entities/cat.entity'

@Controller('cats')
@ApiTags(CatsController.name)
export class CatsController extends CrudController<Cat> {
    constructor(private readonly catsService: CatsService) {
        super(catsService)
    }

    /* @Post()
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
  } */
}
