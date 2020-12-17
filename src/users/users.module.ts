import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Cat } from '../cats/datum/cat.entity'
import { CatRepository } from '../cats/datum/cat.repository'
import { UserRepository } from './datum/user.repository'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
    controllers: [UsersController],
    exports: [UsersService],
    imports: [TypeOrmModule.forFeature([UserRepository])],
    providers: [UsersService],
})
export class UsersModule {}
