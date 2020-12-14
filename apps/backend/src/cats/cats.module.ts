import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CatsController } from 'apps/backend/src/cats/cats.controller'
import { CatsService } from 'apps/backend/src/cats/cats.service'

import { Cat } from 'apps/backend/src/cats/entities/cat.entity'
import { CoreModule } from 'libs/core/src'

@Module({
    imports: [TypeOrmModule.forFeature([Cat]), CoreModule],
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService],
})
export class CatsModule {}
