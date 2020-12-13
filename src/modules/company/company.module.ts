import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CompanyController } from './company.controller'
import { CompanyService } from './company.service'
import { Company } from './entities/company.entity'

@Module({
    controllers: [CompanyController],
    exports: [CompanyService],
    imports: [TypeOrmModule.forFeature([Company])],
    providers: [CompanyService],
})
export class CompanyModule {}
