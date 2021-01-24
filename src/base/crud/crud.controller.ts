import { Get, Delete, Param, ParseIntPipe, HttpStatus, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { BaseModel } from '../../database/models/base.model'
import { ApiErrors } from '../swagger-gen/api-errors.decorator'
import { ICrudService } from './crud.service'
import { IPagination, PaginationParams } from './pagination'

@ApiErrors()
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
        @Query() paginationParams: PaginationParams<T>,
    ): Promise<IPagination<T> | T[]> {
        if (Object.keys(paginationParams).length) {
            return this.service.paginatedFindAll(paginationParams)
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
    async findOneById(@Param('id', ParseIntPipe) id: number): Promise<T> {
        return this.service.findOneById(id)
    }

    @ApiOperation({
        summary: 'Soft-delete one record by id',
        description: 'Soft-delete one record from database with provided by id',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Deleted one record',
        type: BaseModel, // type: T,
    })
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<T> {
        return this.service.remove(id)
    }
}
