/* eslint-disable no-use-before-define,@typescript-eslint/no-use-before-define */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'

import { CompanyService } from 'src/modules/company/company.service'
import {
    CreateCompanyDto,
    UpdateCompanyDto,
} from 'src/modules/company/data/company.dto'
import { Company } from 'src/modules/company/data/company.entity'

@Crud({
    model: {
        type: Company,
    },
    dto: {
        create: CreateCompanyDto,
        update: UpdateCompanyDto,
    },
})
@Controller(CompanyController.path)
@ApiTags(CompanyController.name)
export class CompanyController implements CrudController<Company> {
    public static path = 'companies'

    constructor(public service: CompanyService) {}

    @ApiOperation({ summary: 'Delete all companies' })
    @Post('/clear')
    async clear() {
        return this.service.clear()
    }
}
