import {
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt'

import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
    constructor(
        readonly userService: UsersService,
        readonly jwtService: JwtService,
        readonly config: ConfigService<EnvironmentVariables>,
    ) {}

    async comparePassword(enteredPassword: string, dbPassword: string) {
        return bcrypt.compare(enteredPassword, dbPassword)
    }

    async generateToken(user: Record<string, unknown>) {
        const token = await this.jwtService.signAsync(user)
        const expiresIn = Number(this.config.get('TOKEN_EXPIRATION'))

        return {
            token,
            expiresIn,
        }
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email)

        if (!user)
            return Promise.reject(
                new UnauthorizedException('Unknown User Credentials'),
            )

        const match = await this.comparePassword(password, user.password)

        if (!match)
            return Promise.reject(new UnauthorizedException('Invalid Credentials'))

        return user.toJSON()
    }

    async login(user: Record<string, unknown>) {
        return this.generateToken(user)
    }

    async validateOAuthLoginEmail(accessToken, refreshToken, profile) {
        try {
            const { name, emails, photos } = profile

            const primaryEmail = emails[0].value

            const user = (
                await this.userService.findOneByEmail(primaryEmail)
            ).toJSON()

            return await this.generateToken(user)
        } catch (e) {
            return Promise.reject(
                new InternalServerErrorException(e, 'validateOAuthLoginEmail'),
            )
        }
    }
}
