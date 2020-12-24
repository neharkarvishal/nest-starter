import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TypeOrmModuleOptions } from '../../app.module'
import { UserRepository } from '../datum/user.repository'
import { UsersController } from '../users.controller'
import { UsersService } from '../users.service'

describe('UsersController', () => {
    let controller: UsersController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            imports: [
                TypeOrmModule.forRoot({
                    ...TypeOrmModuleOptions,
                    keepConnectionAlive: true,
                    logging: false,
                }),
                TypeOrmModule.forFeature([UserRepository]),
            ],
            providers: [UsersService],
        }).compile()

        controller = module.get<UsersController>(UsersController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
