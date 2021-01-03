/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common'

import { DeepPartial } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { ICrudService } from './icrud.service'
import { PaginationParams } from './pagination-params'

export abstract class CrudController<T> {
    protected constructor(private readonly crudService: ICrudService<T>) {}

    @Get()
    async findAll(filter?: PaginationParams<T>) {
        return this.crudService.findAll(filter)
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.crudService.findOne(id)
    }

    @Post()
    async create(@Body() entity: DeepPartial<T>, ...options: any[]) {
        return this.crudService.create(entity)
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() entity: QueryDeepPartialEntity<T>,
        ...options: any[]
    ) {
        return this.crudService.update(id, entity) // FIXME: https://github.com/typeorm/typeorm/issues/1544
    }

    @Delete(':id')
    async delete(@Param('id') id: string, ...options: any[]) {
        return this.crudService.delete(id)
    }
}
