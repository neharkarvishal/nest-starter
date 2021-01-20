import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { ExtractJwt, Strategy } from 'passport-jwt'

import { UsersService } from '../users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(readonly userService: UsersService) {
        super({
            ignoreExpiration: true,
            secretOrKey: process.env.JWTKEY,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // eslint-disable-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        })
    }

    async validate(payload) {
        console.log({ payload })
        const user = await this.userService.findOne(payload.id) // eslint-disable-line @typescript-eslint/no-unsafe-member-access

        if (!user) {
            throw new UnauthorizedException(
                'You are not authorized to perform the operation',
            )
        }

        return payload // eslint-disable-line @typescript-eslint/no-unsafe-return
    }
}
