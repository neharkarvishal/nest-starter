import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { AdminRepository } from './datum/admin.repository'

@Module({
    controllers: [AdminController],
    exports: [AdminService],
    imports: [TypeOrmModule.forFeature([AdminRepository])],
    providers: [AdminService],
})
export class AdminModule {}
