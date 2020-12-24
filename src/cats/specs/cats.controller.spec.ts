/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CreateManyDto } from '@nestjsx/crud'
import { RequestQueryBuilder } from '@nestjsx/crud-request'

import * as request from 'supertest'

import { TypeOrmModuleOptions } from '../../app.module'
import { CatsController } from '../cats.controller'
import { CatsService } from '../cats.service'
import { Cat } from '../datum/cat.entity'
import { CatRepository } from '../datum/cat.repository'

describe('#catsController', () => {
    let app: INestApplication
    let server
    let qb: RequestQueryBuilder
    const basePath = '/cats'

    let controller: CatsController
    let service: CatsService

    afterAll(() => {
        void app.close() // eslint-disable-line no-void
    })

    beforeAll(async () => {
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

        app = module.createNestApplication()
        controller = module.get<CatsController>(CatsController)
        service = app.get<CatsService>(CatsService)

        await app.init()
        server = app.getHttpServer()
    })

    beforeEach(() => {
        qb = RequestQueryBuilder.create()
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    describe('#getManyBase', () => {
        it('should return status 200', () => {
            return request(server).get(basePath).expect(200)
        })

        it('should return status 400', (done) => {
            const expected = {
                statusCode: 400,
                message: 'Invalid filter value',
            }
            const query = qb.setFilter({ field: 'foo', operator: 'gt' }).query()

            return request(server)
                .get(basePath)
                .query(query)
                .end((_, res) => {
                    expect(res.status).toEqual(400)
                    expect(res.body).toMatchObject(expected)
                    done()
                })
        })
    })
    //
    describe('#getOneBase', () => {
        it('should return status 200', () => {
            return request(server).get(`${basePath}/1`).expect(200)
        })

        it('should return status 400', (done) => {
            const expected = {
                statusCode: 400,
                message: 'Invalid param id. Number expected',
            }

            return request(server)
                .get(`${basePath}/invalid`)
                .end((_, res) => {
                    expect(res.status).toEqual(400)
                    expect(res.body).toMatchObject(expected)
                    done()
                })
        })
    })

    describe('#createOneBase', () => {
        it('should return status 201', () => {
            const send = {
                name: 'catsname',
                age: 1,
                breed: 'breed',
                userId: 98,
            }

            return request(server).post(basePath).send(send).expect(201)
        })

        it('should return status 400', (done) => {
            const send = {
                name: 'catsname',
            }

            return request(server)
                .post(basePath)
                .send(send)
                .end((_, res) => {
                    expect(res.status).toEqual(400)
                    done()
                })
        })
    })

    describe('#createMadyBase', () => {
        it('should return status 201', () => {
            const send: CreateManyDto<any> = {
                bulk: [
                    {
                        firstName: 'firstName',
                        lastName: 'lastName',
                        email: 'test@test.com',
                        age: 15,
                    },
                    {
                        firstName: 'firstName',
                        lastName: 'lastName',
                        email: 'test@test.com',
                        age: 15,
                    },
                ],
            }
            return request(server).post('/test/bulk').send(send).expect(201)
        })
        it('should return status 400', (done) => {
            const send: CreateManyDto<Cat> = {
                bulk: [],
            }
            return request(server)
                .post('/test/bulk')
                .send(send)
                .end((_, res) => {
                    expect(res.status).toEqual(400)
                    done()
                })
        })
    })

    describe('#replaceOneBase', () => {
        it('should return status 200', () => {
            const send: any = {
                id: 1,
                firstName: 'firstName',
                lastName: 'lastName',
                email: 'test@test.com',
                age: 15,
            }
            return request(server).put('/test/1').send(send).expect(200)
        })
        it('should return status 400', (done) => {
            const send: any = {
                firstName: 'firstName',
                lastName: 'lastName',
                email: 'test@test.com',
            }
            return request(server)
                .put('/test/1')
                .send(send)
                .end((_, res) => {
                    expect(res.status).toEqual(400)
                    done()
                })
        })
    })

    describe('#updateOneBase', () => {
        it('should return status 200', () => {
            const send: any = {
                id: 1,
                firstName: 'firstName',
                lastName: 'lastName',
                email: 'test@test.com',
                age: 15,
            }
            return request(server).patch('/test/1').send(send).expect(200)
        })
        it('should return status 400', (done) => {
            const send: any = {
                firstName: 'firstName',
                lastName: 'lastName',
                email: 'test@test.com',
            }
            return request(server)
                .patch('/test/1')
                .send(send)
                .end((_, res) => {
                    expect(res.status).toEqual(400)
                    done()
                })
        })
    })

    describe('#deleteOneBase', () => {
        it('should return status 200', () => {
            return request(server).delete('/test/1').expect(200)
        })
    })
})
