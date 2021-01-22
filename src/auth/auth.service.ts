import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt'

import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
    constructor(
        readonly configService: ConfigService<EnvironmentVariables>,
        readonly userService: UsersService,
        readonly jwtService: JwtService,
    ) {}

    async comparePassword(enteredPassword: string, dbPassword: string) {
        const match = await bcrypt.compare(enteredPassword, dbPassword)
        return match
    }

    async generateToken(user) {
        return this.jwtService.signAsync(user)
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

        return user.toJSON()
    }

    async login(loginUserDto) {
        const { email, password } = loginUserDto

        // const user = await this.validateUser(email, password)
        const token = await this.generateToken({ email })

        return token
    }
}
