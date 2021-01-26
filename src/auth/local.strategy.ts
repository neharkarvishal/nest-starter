import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { Strategy } from 'passport-local'

import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    static usernameField = 'email'

    static passwordField = 'password'

    constructor(readonly authService: AuthService) {
        super({
            usernameField: LocalStrategy.usernameField,
            passwordField: LocalStrategy.passwordField,
            session: false,
        })
    }

    async validate(email: string, password: string) {
        if (!email || !password)
            return Promise.reject(
                new UnauthorizedException('Credentials cannot be empty'),
            )

        return this.authService.validateUser(email, password)
    }
}
