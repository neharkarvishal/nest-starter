/* eslint-disable jest/no-hooks,jest/prefer-expect-assertions,jest/no-test-return-statement,jest/prefer-hooks-on-top */
import { Test } from '@nestjs/testing'

import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'
import { Cat } from './interfaces/cat.interface'

describe('catsController', () => {
    let catsController: CatsController
    let catsService: CatsService

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [CatsController],
            providers: [CatsService],
        }).compile()

        catsService = moduleRef.get<CatsService>(CatsService)
        catsController = moduleRef.get<CatsController>(CatsController)
    })

    describe('findAll', () => {
        it('should return an array of cats', async () => {
            const result: Cat[] = [
                {
                    age: 2,
                    breed: 'Bombay',
                    name: 'Pixel',
                },
            ]
            jest.spyOn(catsService, 'findAll').mockImplementation(() =>
                Promise.resolve(result),
            )

            expect(await catsController.findAll()).toBe(result)
        })
    })
})
