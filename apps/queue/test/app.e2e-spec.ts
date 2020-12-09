import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import * as request from 'supertest'

import { QueueModule } from '../src/Queue.module'

describe('queueController (e2e)', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [QueueModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!')
    })
})
