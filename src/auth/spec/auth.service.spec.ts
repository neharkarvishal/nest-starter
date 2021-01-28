import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'

import * as bcrypt from 'bcrypt'
import { PartialModelObject } from 'objection'

import { databaseProviders } from '../../database/database.module'
import { User } from '../../users/user.model'
import { UsersService } from '../../users/users.service'
import { AuthService } from '../auth.service'
import { mockedConfigService, mockedJwtService } from './mocks'

jest.mock('bcrypt')

describe('AuthService', () => {
    let service: AuthService
    let usersService: UsersService
    let bcryptCompare: jest.Mock
    let userData: PartialModelObject<User>
    let findOne: jest.Mock

    beforeEach(async () => {
        userData = {
            // @ts-ignore
            toJSON: () => ({
                id: 1,
                username: 'admin',
                email: 'admin@demo.com',
                firstName: 'admin',
                lastName: 'user',
                isActive: true,
            }),
            id: 1,
            username: 'admin',
            email: 'admin@demo.com',
            firstName: 'admin',
            lastName: 'user',
            isActive: true,
        }

        findOne = jest.fn().mockResolvedValue(userData)

        bcryptCompare = jest.fn().mockReturnValue(true)
        ;(bcrypt.compare as jest.Mock) = bcryptCompare

        const module: TestingModule = await Test.createTestingModule({
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
                {
                    provide: User,
                    useValue: {
                        query: () => ({
                            findOne,
                        }),
                    },
                },
            ],
        }).compile()

        service = module.get<AuthService>(AuthService)
        usersService = await module.get(UsersService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('when creating a token', () => {
        it('should return a string', async () => {
            const user = {
                id: 1,
                username: 'admin',
                email: 'admin@demo.com',
                firstName: 'admin',
                lastName: 'user',
                isActive: 1,
            }

            const token = await service.generateToken(user)

            expect(typeof token).toEqual('string')
        })
    })

    describe('when accessing the data of authenticating user', () => {
        it('should attempt to get a user by email', async () => {
            const getByEmailSpy = jest.spyOn(usersService, 'findOneByEmail')

            await service.validateUser('user@email.com', 'strongPassword')

            expect(getByEmailSpy).toBeCalledTimes(1)
        })

        describe('and the provided password is not valid', () => {
            beforeEach(() => {
                bcryptCompare.mockReturnValue(false)
            })
            it('should throw an error', async () => {
                await expect(
                    service.validateUser('user@email.com', 'strongPassword'),
                ).rejects.toThrow()
            })
        })

        describe('and the provided password is valid', () => {
            beforeEach(() => {
                bcryptCompare.mockReturnValue(true)
            })

            describe('and the user is found in the database', () => {
                beforeEach(() => {
                    findOne.mockResolvedValue(userData)
                })
                it('should return the user data', async () => {
                    const user = await service.validateUser(
                        'user@email.com',
                        'strongPassword',
                    )

                    expect(user).toStrictEqual(JSON.parse(JSON.stringify(userData)))
                })
            })

            describe('and the user is not found in the database', () => {
                beforeEach(() => {
                    findOne.mockResolvedValue(undefined)
                })
                it('should throw an error', async () => {
                    await expect(
                        service.validateUser('user@email.com', 'strongPassword'),
                    ).rejects.toThrow()
                })
            })
        })
    })
})
