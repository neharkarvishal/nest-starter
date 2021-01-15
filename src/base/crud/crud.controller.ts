/* eslint-disable @typescript-eslint/no-unsafe-return,@typescript-eslint/require-await */
import {
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    ParseIntPipe,
    HttpStatus,
} from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { Page } from 'objection'
import { DeepPartial } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { BaseModel } from '../../database/models/base.model'
import { ICrudService } from './icrud.service'
import { IPagination } from './pagination'
import { PaginationParams } from './pagination-params'

export abstract class CrudController<T extends BaseModel> {
    protected constructor(protected readonly service: ICrudService<T>) {}

    @ApiOperation({ summary: 'find all', description: 'Get all of the users' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Found records',
        // type: Page<BaseModel>
    })
    @Get()
    async findAll(filter: PaginationParams<T>): Promise<Page<T>> {
        return this.service.findAll(filter)
    }

    @ApiOperation({
        summary: 'Get one record by id',
        description: 'Get one record from database with provided by id',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Found one record',
        type: BaseModel, // type: T,
    })
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<T> {
        return this.service.findOne(id)
    }
}
