import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'
import { Cat } from './datum/cat.entity'
import { CatRepository } from './datum/cat.repository'

@Module({
    controllers: [CatsController],
    exports: [CatsService],
    imports: [TypeOrmModule.forFeature([CatRepository])],
    providers: [CatsService],
})
export class CatsModule {}
