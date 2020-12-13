import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from 'src/modules/users/entities/user.entity'
import { UsersController } from 'src/modules/users/users.controller'
import { UsersService } from 'src/modules/users/users.service'

@Module({
    controllers: [UsersController],
    exports: [UsersService],
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
})
export class UsersModule {}
