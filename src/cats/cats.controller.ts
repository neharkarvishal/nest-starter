/* eslint-disable no-use-before-define */
import { Controller, Get, HttpStatus, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
    CreateManyDto,
    Crud,
    CrudController,
    CrudRequest,
    Override,
    ParsedBody,
    ParsedRequest,
} from '@nestjsx/crud'
import { CrudOptions } from '@nestjsx/crud/lib/interfaces'

import { User } from '../users/datum/user.entity'
import { CatsService } from './cats.service'
import {
    CreateCatDto,
    GetCatResponseDto,
    GetManyCatResponseDto,
    UpdateCatDto,
} from './datum/cat.dto'
import { Cat } from './datum/cat.entity'

@ApiTags(CatsController.name)
@Controller(CatsController.path)
@Crud(CatsController.crudOptions)
export class CatsController implements CrudController<Cat> {
    constructor(public service: CatsService) {}

    static path = 'cats'

    static crudOptions: CrudOptions = {
        model: {
            type: Cat,
        },
        dto: {
            create: CreateCatDto,
            replace: CreateCatDto,
            update: UpdateCatDto,
        },
        serialize: {
            create: GetCatResponseDto,
            delete: GetCatResponseDto,
            get: GetCatResponseDto,
            update: GetCatResponseDto,
        },
        query: {
            alwaysPaginate: true,
            join: {
                user: {
                    eager: true,
                    exclude: User.exclude,
                },
            },
        },
        params: {
            id: {
                field: 'id', // `/api/cats/:slug` -> `/api/cats/1`
                type: 'number',
                primary: true,
            },
            // catId: {
            //     field: 'catId', // `/api/cats/:catId/user` -> `/api/cats/1/user`
            //     type: 'number',
            //     primary: false,
            //     disabled: false,
            // },
        },
    }

    get base(): CrudController<Cat> {
        return this
    }

    /**
     * Get one CAT
     */
    @ApiResponse({ status: HttpStatus.OK, type: GetCatResponseDto })
    @Override()
    async getOne(@ParsedRequest() r: CrudRequest) {
        return this.service.getOne(r)
    }

    /**
     * Get many CATs
     */
    @ApiResponse({ status: HttpStatus.OK, type: GetManyCatResponseDto })
    @Override()
    async getMany(@ParsedRequest() r: CrudRequest) {
        return this.service.getMany(r)
    }

    /**
     * Create one CAT
     */
    @ApiResponse({ status: HttpStatus.OK, type: GetCatResponseDto })
    @Override()
    async createOne(
        @ParsedRequest() r: CrudRequest,
        @ParsedBody() cat: CreateCatDto,
    ) {
        return this.service.createOne(r, cat)
    }

    /**
     * Create many CATs
     */
    @ApiResponse({ status: HttpStatus.OK, type: GetManyCatResponseDto })
    @Override()
    async createMany(
        @ParsedRequest() r: CrudRequest,
        @ParsedBody() cats: CreateManyDto<Cat>,
    ) {
        return this.service.createMany(r, cats)
    }

    /**
     * Update  CAT
     */
    @ApiResponse({ status: HttpStatus.OK, type: GetCatResponseDto })
    @Override()
    async updateOne(
        @ParsedRequest() r: CrudRequest,
        @ParsedBody() cat: UpdateCatDto,
    ) {
        return this.service.updateOne(r, cat as Cat)
    }

    /**
     * Replace CAT
     */
    @ApiResponse({ status: HttpStatus.OK, type: GetCatResponseDto })
    @Override()
    async replaceOne(
        @ParsedRequest() r: CrudRequest,
        @ParsedBody() cat: CreateCatDto,
    ) {
        // @ts-ignore
        return this.service.replaceOne(r, cat)
    }

    /**
     * Delete CAT
     */
    @Override()
    async deleteOne(@ParsedRequest() r: CrudRequest) {
        return this.service.deleteOne(r)
    }

    /**
     * Get CATs owner
     */
    @Get('/:catId/user')
    async getUserByCatId(@Param('catId') catId: number) {
        return this.service.getUserByCatId(catId)
    }

    /**
     * Delete all CAT
     */
    @ApiOperation({ summary: 'Delete all Cats' })
    @Post('/clear')
    async clear() {
        return this.service.clear()
    }
}
