/* eslint-disable no-use-before-define */
import { Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'

import { CatsService } from './cats.service'
import { CreateCatDto, UpdateCatDto, GetCatResponseDto } from './datum/cat.dto'
import { Cat } from './datum/cat.entity'
import { User } from '../users/datum/user.entity'

@Controller(CatsController.path)
@ApiTags(CatsController.name)
@Crud({
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
