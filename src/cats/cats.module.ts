import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'
import { Cat } from './datum/cat.entity'

@Module({
    controllers: [CatsController],
    exports: [CatsService],
    imports: [TypeOrmModule.forFeature([Cat])],
    providers: [CatsService],
})
export class CatsModule {}
