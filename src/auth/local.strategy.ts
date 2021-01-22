import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { Strategy } from 'passport-local'

import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(readonly authService: AuthService) {
        super({ usernameField: 'email', session: false })
    }

    async validate(email: string, password: string) {
        if (!email || !password) return Promise.reject(new UnauthorizedException())

        const user = await this.authService.validateUser(email, password)

        if (!user)
            return Promise.reject(
                new UnauthorizedException(
                    'You are not authorized to perform the operation',
                ),
            )

        return user
    }
}
