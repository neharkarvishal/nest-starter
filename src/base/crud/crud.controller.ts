import {
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    ParseIntPipe,
    HttpStatus,
    Query,
} from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { BaseModel } from '../../database/models/base.model'
import { ICrudService } from './crud.service'
import { IPagination, PaginationParams } from './pagination'

export abstract class CrudController<T extends BaseModel> {
    protected constructor(protected readonly service: ICrudService<T>) {}

    @ApiOperation({ summary: 'find all', description: 'Get all of the records' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Found all records',
        // type: IPagination<BaseModel> | BaseModel[]
    })
    @Get()
    async findAll(
        @Query() filter: PaginationParams<T>,
    ): Promise<IPagination<T> | T[]> {
        if (filter) {
            return this.service.paginatedFindAll(filter)
        }

        return this.service.findAll()
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
