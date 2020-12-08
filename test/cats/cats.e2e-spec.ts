/* eslint-disable jest/no-hooks,jest/prefer-expect-assertions,jest/no-test-return-statement,jest/prefer-hooks-on-top */
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import * as request from 'supertest'

import { CatsModule } from '../../src/modules/cats/cats.module'
import { CatsService } from '../../src/modules/cats/cats.service'

describe('cats', () => {
    const catsService = { findAll: () => ['test'] }

    let app: INestApplication

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [CatsModule],
        })
            .overrideProvider(CatsService)
            .useValue(catsService)
            .compile()

        app = moduleRef.createNestApplication()
        await app.init()
    })

    it(`/GET cats`, () => {
        return request(app.getHttpServer())
            .get('/cats')
            .expect(200)
            .expect(catsService.findAll())
    })

    afterAll(async () => {
        await app.close()
    })
})
