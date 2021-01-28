import { INestApplication, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'

import { ModelObject, PartialModelObject } from 'objection'
import * as request from 'supertest'

import { databaseProviders } from '../../database/database.module'
import { User } from '../../users/user.model'
import { UsersService } from '../../users/users.service'
import { AuthController } from '../auth.controller'
import { AuthService } from '../auth.service'
import { mockedConfigService, mockedJwtService } from './mocks'

describe('AuthController', () => {
    let app: INestApplication
    let controller: AuthController
    let userData: PartialModelObject<User>

    beforeEach(async () => {
        userData = {
            id: 1,
            username: 'admin',
            email: 'admin@demo.com',
            firstName: 'admin',
            lastName: 'user',
            isActive: true,
        }

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                AuthService,
                UsersService,
                {
                    provide: ConfigService,
                    useValue: mockedConfigService,
                },
                {
                    provide: JwtService,
                    useValue: mockedJwtService,
                },
                ...databaseProviders,
            ],
        }).compile()

        app = module.createNestApplication()
        app.useGlobalPipes(new ValidationPipe())
        await app.init()

        controller = module.get<AuthController>(AuthController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    describe('when registering', () => {
        describe('and using valid data', () => {
            it('should respond with the data of the user without the password', () => {
                const expectedData = {
                    ...userData,
                }

                delete expectedData.password

                return request(app.getHttpServer())
                    .post('/auth/login')
                    .send({
                        email: userData.email,
                        password: 'strongPassword',
                    })
                    .expect(201)
                    .expect(expectedData)
            })
        })
    })
})
