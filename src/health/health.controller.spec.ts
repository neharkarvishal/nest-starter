import { Test, TestingModule } from '@nestjs/testing'

import { HealthController } from './health.controller'

describe('healthController', () => {
    let controller: HealthController

    // eslint-disable-next-line jest/no-hooks
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [HealthController],
        }).compile()

        controller = module.get<HealthController>(HealthController)
    })

    // eslint-disable-next-line jest/prefer-expect-assertions
    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
