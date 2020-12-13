import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CompanyController } from 'src/modules/company/company.controller'
import { CompanyService } from 'src/modules/company/company.service'
import { Company } from 'src/modules/company/data/company.entity'

@Module({
    controllers: [CompanyController],
    exports: [CompanyService],
    imports: [TypeOrmModule.forFeature([Company])],
    providers: [CompanyService],
})
export class CompanyModule {}
