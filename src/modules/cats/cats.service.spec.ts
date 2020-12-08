import { Test, TestingModule } from '@nestjs/testing'

import { CatsService } from 'src/modules/cats/cats.service'

describe('catsService', () => {
    let service: CatsService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CatsService],
        }).compile()

        service = module.get<CatsService>(CatsService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
