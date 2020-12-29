/* eslint-disable no-use-before-define */
import { Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
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
import { CreateCatDto, GetCatResponseDto, UpdateCatDto } from './datum/cat.dto'
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
    }

    constructor(public service: CatsService) {}

    get base(): CrudController<Cat> {
        return this
    }

    @Override()
    async getOne(@ParsedRequest() r: CrudRequest) {
        return this.base.getOneBase(r)
    }

    @Override()
    async getMany(@ParsedRequest() r: CrudRequest) {
        return this.base.getManyBase(r)
    }

    @Override()
    async createOne(
        @ParsedRequest() r: CrudRequest,
        @ParsedBody() cat: CreateCatDto,
    ) {
        // @ts-ignore
        return this.base.createOneBase(r, cat)
    }

    @Override()
    async createMany(
        @ParsedRequest() r: CrudRequest,
        @ParsedBody() cats: CreateManyDto<Cat>,
    ) {
        return this.base.createManyBase(r, cats)
    }

    @Override()
    async updateOne(
        @ParsedRequest() r: CrudRequest,
        @ParsedBody() cat: UpdateCatDto,
    ) {
        return this.base.updateOneBase(r, cat as Cat)
    }

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

    @ApiOperation({ summary: 'Delete all Cats' })
    @Post('/clear')
    async clear() {
        return this.service.clear()
    }
}
