import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CatsController } from 'apps/backend/src/cats/cats.controller'
import { CatsService } from 'apps/backend/src/cats/cats.service'

import { Cat } from './entities/cat.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Cat])],
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService],
})
export class CatsModule {}
