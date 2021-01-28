import { Test, TestingModule } from '@nestjs/testing'

import { databaseProviders } from '../../database/database.module'
import { User } from '../user.model'
import { UsersService } from '../users.service'

describe('UsersService', () => {
    let service: UsersService
    let findOne: jest.Mock

    beforeEach(async () => {
        findOne = jest.fn()

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
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

        service = module.get<UsersService>(UsersService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('when getting a user by email', () => {
        describe('and the user is matched', () => {
            let user: User

            beforeEach(() => {
                user = new User()
                findOne.mockReturnValue(Promise.resolve(user))
            })

            it('should return the user', async () => {
                const fetchedUser = await service.findOneByEmail('test@test.com')
                expect(fetchedUser).toEqual(user)
            })
        })

        describe('and the user is not matched', () => {
            beforeEach(() => {
                findOne.mockReturnValue(undefined)
            })

            it('should throw an error', async () => {
                await expect(
                    service.findOneByEmail('test@test.com'),
                ).rejects.toThrow()
            })
        })
    })
})
