import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'

import { Company } from 'src/modules/company/data/company.entity'

import { getManager } from 'typeorm'

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
}
