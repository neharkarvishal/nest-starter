import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TypeOrmModuleOptions } from '../../app.module'
import { UserRepository } from '../datum/user.repository'
import { UsersService } from '../users.service'

describe('UsersService', () => {
    let service: UsersService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService],
            imports: [
                TypeOrmModule.forRoot({
                    ...TypeOrmModuleOptions,
                    keepConnectionAlive: true,
                    logging: false,
                }),
                TypeOrmModule.forFeature([UserRepository]),
            ],
        }).compile()

        service = module.get<UsersService>(UsersService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
