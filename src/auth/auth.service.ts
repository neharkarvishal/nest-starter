import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt'

import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
    constructor(
        readonly userService: UsersService,
        readonly jwtService: JwtService,
    ) {}

    async comparePassword(enteredPassword: string, dbPassword: string) {
        const match = await bcrypt.compare(enteredPassword, dbPassword) // eslint-disable-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
        return match // eslint-disable-line @typescript-eslint/no-unsafe-return
    }

    async generateToken(user) {
        return this.jwtService.signAsync(user, {
            secret: process.env.JWTKEY,
            expiresIn: process.env.TOKEN_EXPIRATION,
        })
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email)

        if (!user) {
            return null
        }

        const match = await this.comparePassword(password, user.password)

        if (!match) {
            return null
        }

        return user.toJSON({ shallow: true })
    }

    async login(loginUserDto) {
        const { email, password } = loginUserDto

        const user = await this.validateUser(email, password)
        const token = await this.generateToken(user)

        return { user, token }
    }
}
