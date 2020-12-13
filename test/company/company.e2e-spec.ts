/* eslint-disable jest/no-hooks,jest/prefer-expect-assertions,jest/no-test-return-statement,jest/prefer-hooks-on-top */
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import * as request from 'supertest'

import { CompanyModule } from '../../src/modules/company/company.module'
import { CompanyService } from '../../src/modules/company/company.service'

describe('cats', () => {
    const companyService = { findAll: () => ['test'] }

    let app: INestApplication

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [CompanyModule],
        })
            .overrideProvider(CompanyService)
            .useValue(companyService)
            .compile()

        app = moduleRef.createNestApplication()
        await app.init()
    })

    it(`/GET company`, () => {
        return request(app.getHttpServer())
            .get('/company')
            .expect(200)
            .expect(companyService.findAll())
    })

    afterAll(async () => {
        await app.close()
    })
})
