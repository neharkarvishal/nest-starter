import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import type { Profile, VerifyCallback } from 'passport-google-oauth20'
import { Strategy } from 'passport-google-oauth20'

import { AuthService } from './auth.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        readonly config: ConfigService<EnvironmentVariables>,
        readonly authService: AuthService,
    ) {
        super({
            passReqToCallback: true,
            scope: ['profile', 'email'],
            clientID: config.get('GOOGLE_CLIENT_ID') || 'disabled',
            clientSecret: config.get('GOOGLE_SECRET') || 'disabled',
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            callbackURL: `${config.get('HOST')}:${config.get(
                'PORT',
            )}/api/auth/google/redirect`,
        })
    }

    async validate(
        request: Express.Request,
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback, // `@nestjs/passport` internally call this, do not call
    ) {
        try {
            return await this.authService.validateOAuthLoginEmail(
                accessToken,
                refreshToken,
                profile,
            )
        } catch (err) {
            return Promise.reject(new UnauthorizedException(err, 'Google Strategy'))
        }
    }
}
