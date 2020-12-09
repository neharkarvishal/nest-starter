import { Test, TestingModule } from '@nestjs/testing'

import { HealthController } from '@app/health/health.controller'

describe('healthController', () => {
    let controller: HealthController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [HealthController],
        }).compile()

        controller = module.get<HealthController>(HealthController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})