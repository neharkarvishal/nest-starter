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
    NotFoundException,
} from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { BaseModel } from '../../database/models/base.model'
import { Result } from '../../domain'
import { ApiErrors } from '../swagger-gen/api-errors.decorator'
import { ICrudService } from './crud.service.interface'
import { IPaginationResult, PaginationParams } from './pagination'

/**
 * Abstract base controller of BaseModel that other controller can extend to
 * provide base CRUD functionality such as to create, find, update and delete data.
 */
@ApiErrors()
export abstract class CrudController<T extends BaseModel> {
    /**
     * The constructor must receive the injected service from the child controller
     * in order to provide all the proper base functionality.
     *
     * @param {ICrudService} service - The injected service.
     */
    protected constructor(protected readonly service: ICrudService<T>) {}

    /**
     * findAll
     */
    @ApiOperation({ summary: 'find all', description: 'Get all of the records' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Found all records',
        // type: IPagination<BaseModel> | BaseModel[]
    })
    @Get()
    async findAll(
        @Query() paginationParams: PaginationParams<T>,
    ): Promise<IPaginationResult<T>> {
        const { data, paging } = await this.service.paginatedFindAll(
            paginationParams,
        )

        return ({
            data,
            paging,
            statusCode: HttpStatus.OK,
        } as unknown) as IPaginationResult<T>
    }

    /**
     * findOneById
     */
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
    async findOneById(@Param('id', ParseIntPipe) id: number): Promise<Result<T>> {
        const data = await this.service.findOneById(id)

        if (!data) {
            throw new NotFoundException()
        }

        return {
            data,
            statusCode: HttpStatus.OK,
        }
    }

    /**
     * remove
     */
    @ApiOperation({
        summary: 'Soft-delete one record by id',
        description: 'Soft-delete one record from database with provided by id',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Deleted one record',
        type: BaseModel, // type: T,
    })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Deleted one record',
    })
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        const data = await this.service.remove(id)

        return {
            data,
            statusCode: !data ? HttpStatus.NO_CONTENT : HttpStatus.OK,
        }
    }

    /**
     * create
     */
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
    async create(@Body() input: T) {
        const data = await this.service.create(input)

        return {
            data,
            statusCode: HttpStatus.CREATED,
        }
    }

    /**
     * update
     */
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
    async update(@Param('id', ParseIntPipe) id: number, @Body() input: Partial<T>) {
        const data = await this.service.update(id, input)

        return {
            data,
            statusCode: !data ? HttpStatus.NO_CONTENT : HttpStatus.OK,
        }
    }
}
