/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RequestQueryBuilder } from '@nestjsx/crud-request'

import * as request from 'supertest'

import { TypeOrmModuleOptions } from '../../app.module'
import { CatsController } from '../cats.controller'
import { CatsService } from '../cats.service'
import { CatRepository } from '../datum/cat.repository'

describe('catsController', () => {
    let app: INestApplication
    let server: any
    let qb: RequestQueryBuilder

    let controller: CatsController
    let service: CatsService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CatsController],
            imports: [
                TypeOrmModule.forRoot({
                    ...TypeOrmModuleOptions,
                    keepConnectionAlive: true,
                    logging: false,
                }),
                TypeOrmModule.forFeature([CatRepository]),
            ],
            providers: [CatsService],
        }).compile()

        controller = module.get<CatsController>(CatsController)

        app = module.createNestApplication()
        service = app.get<CatsService>(CatsService)

        await app.init()
        server = app.getHttpServer()
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    describe('#select', () => {
        it('should throw status 404', (done) => {
            return request(server)
                .get('/cars')
                .end((_, res) => {
                    expect(res.status).toBe(404)
                    done()
                })
        })
    })
})
