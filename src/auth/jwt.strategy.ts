import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import { ExtractJwt, Strategy } from 'passport-jwt'

import { UsersService } from '../users/users.service'
import TokenPayload from './tokenPayload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        readonly configService: ConfigService<EnvironmentVariables>,
        readonly userService: UsersService,
    ) {
        super({
            ignoreExpiration: true,
            secretOrKey: configService.get('JWTKEY'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: TokenPayload) {
        const timeDiff = Number(payload?.exp) - Number(payload?.iat)

        if (!payload?.email || timeDiff <= 0)
            return Promise.reject(new UnauthorizedException())

        const user = await this.userService.findOneByEmail(payload.email)

        if (!user)
            return Promise.reject(
                new UnauthorizedException(
                    'You are not authorized to perform the operation',
                ),
            )

        return payload
    }
}
