import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'

import { databaseProviders } from '../../database/database.module'
import { UsersService } from '../../users/users.service'
import { AuthService } from '../auth.service'

const mockedJwtService = {
    sign: () => '',
    signAsync: async () => Promise.resolve(''),
}

const mockedConfigService = {
    // eslint-disable-next-line consistent-return
    get(key: string) {
        // eslint-disable-next-line default-case
        switch (key) {
            case 'JWT_ACCESS_TOKEN_EXPIRATION_TIME':
                return '3600'
        }
    },
}

describe('AuthService', () => {
    let service: AuthService

    beforeEach(async () => {
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
            ],
        }).compile()

        service = module.get<AuthService>(AuthService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('when creating a token', () => {
        it('should return a string', async () => {
            const userId = 1

            const token = await service.generateToken(userId)

            expect(typeof token).toEqual('string')
        })
    })
})
