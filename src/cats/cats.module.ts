import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserRepository } from '../users/datum/user.repository'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'
import { CatRepository } from './datum/cat.repository'

@Module({
    controllers: [CatsController],
    exports: [CatsService],
    imports: [TypeOrmModule.forFeature([CatRepository, UserRepository])],
    providers: [CatsService],
})
export class CatsModule {}
