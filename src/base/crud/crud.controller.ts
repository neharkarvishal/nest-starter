import {
    Get,
    Delete,
    Param,
    ParseIntPipe,
    HttpStatus,
    Query,
    Body,
    Put,
    Post,
} from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { BaseModel } from '../../database/models/base.model'
import { CreateTagsDto, UpdateTagsDto } from '../../tags/tag.model'
import { CreateUserDto, UpdateUserDto } from '../../users/user.model'
import { ApiErrors } from '../swagger-gen/api-errors.decorator'
import { ICrudService } from './crud.service'
import { IPagination, PaginationParams } from './pagination'

// @ApiErrors()
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
@ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
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
    async remove(@Param('id', ParseIntPipe) id: number): Promise<T> {
        return this.service.remove(id)
    }

    @ApiOperation({
        summary: 'Create one record',
        description: 'Creates one record',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Created one record',
        type: BaseModel, // type: T,
    })
    @Post(':id')
    async create(@Body() data: T): Promise<T> {
        return this.service.create(data)
    }

    @ApiOperation({
        summary: 'Update one record',
        description: 'Updates one record',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Updated one record',
        type: BaseModel, // type: T,
    })
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: Partial<T>,
    ): Promise<T> {
        return this.service.update(id, data)
    }
}
