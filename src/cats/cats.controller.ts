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

@Controller(CatsController.path)
@ApiTags(CatsController.name)
@Crud(CatsController.crudOptions)
export class CatsController implements CrudController<Cat> {
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

    constructor(public service: CatsService) {}

    get base(): CrudController<Cat> {
        return this
    }

    @ApiResponse({ status: HttpStatus.OK, type: GetCatResponseDto })
    @Override()
    async getOne(@ParsedRequest() r: CrudRequest) {
        return this.base.getOneBase(r)
    }

    @ApiResponse({ status: HttpStatus.OK, type: GetManyCatResponseDto })
    @Override()
    async getMany(@ParsedRequest() r: CrudRequest) {
        return this.base.getManyBase(r)
    }

    @ApiResponse({ status: HttpStatus.OK, type: GetCatResponseDto })
    @Override()
    async createOne(
        @ParsedRequest() r: CrudRequest,
        @ParsedBody() cat: CreateCatDto,
    ) {
        // @ts-ignore
        return this.base.createOneBase(r, cat)
    }

    @ApiResponse({ status: HttpStatus.OK, type: GetManyCatResponseDto })
    @Override()
    async createMany(
        @ParsedRequest() r: CrudRequest,
        @ParsedBody() cats: CreateManyDto<Cat>,
    ) {
        return this.base.createManyBase(r, cats)
    }

    @ApiResponse({ status: HttpStatus.OK, type: GetCatResponseDto })
    @Override()
    async updateOne(
        @ParsedRequest() r: CrudRequest,
        @ParsedBody() cat: UpdateCatDto,
    ) {
        return this.base.updateOneBase(r, cat as Cat)
    }

    @ApiResponse({ status: HttpStatus.OK, type: GetCatResponseDto })
    @Override()
    async replaceOne(
        @ParsedRequest() r: CrudRequest,
        @ParsedBody() cat: CreateCatDto,
    ) {
        // @ts-ignore
        return this.base.replaceOneBase(r, cat)
    }

    @Override()
    async deleteOne(@ParsedRequest() r: CrudRequest) {
        return this.base.deleteOneBase(r)
    }

    @Get('/:catId/user')
    async getUserByCatId(@Param('catId') catId: number) {
        return this.service.getUserByCatId(catId)
    }

    @ApiOperation({ summary: 'Delete all Cats' })
    @Post('/clear')
    async clear() {
        return this.service.clear()
    }
}
