import { Test, TestingModule } from '@nestjs/testing'

import { databaseProviders } from '../../database/database.module'
import { UsersController } from '../users.controller'
import { UsersService } from '../users.service'

describe('UsersController', () => {
    let controller: UsersController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [...databaseProviders, UsersService],
        }).compile()

        controller = module.get<UsersController>(UsersController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
