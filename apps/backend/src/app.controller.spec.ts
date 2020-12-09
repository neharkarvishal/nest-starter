import { Test, TestingModule } from '@nestjs/testing'

import { AppController } from 'apps/backend/src/app.controller'
import { AppService } from 'apps/backend/src/app.service'

describe('appController', () => {
    let appController: AppController

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile()

        appController = app.get<AppController>(AppController)
    })

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(appController.getHello()).toBe('Hello World!')
        })
    })
})
