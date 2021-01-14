/* eslint-disable no-use-before-define */
import { Controller, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { CrudController } from '../base/crud'
import { AdminService } from './admin.service'
import { Admin } from './datum/admin.entity'

@ApiTags(AdminController.name)
@Controller(AdminController.path)
export class AdminController extends CrudController<Admin> {
    constructor(readonly service: AdminService) {
        super(service)
    }

    static path = 'admin'

    @Get('/email/:email')
    async findByEmail(@Param('email') email: string) {
        return this.service.getUserByEmail(email)
    }

    @ApiOperation({ summary: 'Delete all admin' })
    @Post('/clear')
    async clear() {
        return this.service.clear()
    }
}
