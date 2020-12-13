/* eslint-disable no-use-before-define,@typescript-eslint/no-use-before-define */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'
import { Crud, CrudController } from '@nestjsx/crud'

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { CompanyService } from './company.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { Company } from './entities/company.entity'

@Crud({
    model: {
        type: Company,
    },
    dto: {
        create: CreateCompanyDto,
        update: UpdateCompanyDto,
    },
})
@Controller('company')
@ApiTags(CompanyController.name)
export class CompanyController implements CrudController<Company> {
    constructor(public service: CompanyService) {}

    @ApiOperation({ summary: 'Delete all companies' })
    @Post('/clear')
    async clear() {
        return this.service.clear()
    }

    /* @Post()
    create(@Body() createCompanyDto: CreateCompanyDto) {
        return this.companyService.create(createCompanyDto)
    }

    @Get()
    findAll() {
        return this.companyService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.companyService.findOne(+id)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
        return this.companyService.update(+id, updateCompanyDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.companyService.remove(+id)
    } */
}
