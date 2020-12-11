import { Test, TestingModule } from '@nestjs/testing'

import { CatsController } from 'apps/backend/src/cats/cats.controller'
import { CatsService } from 'apps/backend/src/cats/cats.service'

describe('catsController', () => {
    let controller: CatsController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CatsController],
            providers: [CatsService],
        }).compile()

        controller = module.get<CatsController>(CatsController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
