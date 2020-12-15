/* eslint-disable no-use-before-define */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'

import { CatsService } from './cats.service'
import { CreateCatDto, UpdateCatDto, GetCatResponseDto } from './datum/cat.dto'
import { Cat } from './datum/cat.entity'

@Controller(CatsController.path)
@ApiTags(CatsController.name)
@Crud({
    model: {
        type: Cat,
    },
    dto: {
        create: CreateCatDto,
        update: UpdateCatDto,
    },
    serialize: {
        get: GetCatResponseDto,
    },
    query: {
        alwaysPaginate: true,
    },
})
export class CatsController implements CrudController<Cat> {
    static path = 'cats'

    constructor(public service: CatsService) {}

    @ApiOperation({ summary: 'Delete all Cats' })
    @Post('/clear')
    async clear() {
        return this.service.clear()
    }
}
