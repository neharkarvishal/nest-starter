import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '../users/datum/user.entity'
import { UserRepository } from '../users/datum/user.repository'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'
import { CatRepository } from './datum/cat.repository'

@Module({
    controllers: [CatsController],
    exports: [CatsService],
    imports: [TypeOrmModule.forFeature([CatRepository])],
    providers: [CatsService],
})
export class CatsModule {}
