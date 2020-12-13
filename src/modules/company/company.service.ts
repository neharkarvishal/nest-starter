import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'

import { getManager } from 'typeorm'

import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { Company } from './entities/company.entity'

@Injectable()
export class CompanyService extends TypeOrmCrudService<Company> {
    constructor(@InjectRepository(Company) public repo) {
        super(repo)
    }

    async clear() {
        let cleared = {}
        cleared = await getManager().query('DELETE FROM company') // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        return cleared
    }

    /* create(createCompanyDto: CreateCompanyDto) {
        return 'This action adds a new company'
    }

    findAll() {
        return `This action returns all company`
    }

    findOne(id: number) {
        return `This action returns a #${id} company`
    }

    update(id: number, updateCompanyDto: UpdateCompanyDto) {
        return `This action updates a #${id} company`
    }

    remove(id: number) {
        return `This action removes a #${id} company`
    } */
}
