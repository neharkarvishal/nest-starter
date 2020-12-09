import { Test, TestingModule } from '@nestjs/testing'

import { QueueController } from 'apps/queue/src/queue.controller'
import { QueueService } from 'apps/queue/src/queue.service'

describe('queueController', () => {
    let queueController: QueueController

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [QueueController],
            providers: [QueueService],
        }).compile()

        queueController = app.get<QueueController>(QueueController)
    })

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(queueController.getHello()).toBe('Hello World!')
        })
    })
})
