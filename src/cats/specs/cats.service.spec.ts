import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TypeOrmModuleOptions } from '../../app.module'
import { CatsService } from '../cats.service'
import { CatRepository } from '../datum/cat.repository'

describe('catsService', () => {
    let service: CatsService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CatsService],
            imports: [
                TypeOrmModule.forRoot({
                    ...TypeOrmModuleOptions,
                    keepConnectionAlive: true,
                    logging: false,
                }),
                TypeOrmModule.forFeature([CatRepository]),
            ],
        }).compile()

        service = module.get<CatsService>(CatsService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
