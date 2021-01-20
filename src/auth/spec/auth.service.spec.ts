import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'

import { DatabaseModule } from '../../database/database.module'
import { UsersService } from '../../users/users.service'
import { AuthService } from '../auth.service'
import { User } from '../../users/user.model'

const mockedJwtService = {
    sign: () => '',
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
                DatabaseModule,
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
                {
                    provide: User,
                    useValue: {},
                },
            ],
        }).compile()

        service = module.get<AuthService>(AuthService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('when creating a token', () => {
        it('should return a string', () => {
            const userId = 1

            expect(typeof service.generateToken(userId)).toEqual('string')
        })
    })
})
