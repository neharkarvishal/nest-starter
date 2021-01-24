import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
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
        return bcrypt.compare(enteredPassword, dbPassword)
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

    async login(user) {
        return this.generateToken(user)
    }
}
