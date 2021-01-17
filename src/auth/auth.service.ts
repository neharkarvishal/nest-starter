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

    compareRaw(enteredPassword: string, dbPassword: string) {
        return String(enteredPassword) === String(dbPassword)
    }

    async comparePassword(enteredPassword: string, dbPassword: string) {
        const match = await bcrypt.compare(enteredPassword, dbPassword) // eslint-disable-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
        return match // eslint-disable-line @typescript-eslint/no-unsafe-return
    }

    async hashPassword(password: string) {
        const hash = await bcrypt.hash(password, 12) // eslint-disable-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
        return hash // eslint-disable-line @typescript-eslint/no-unsafe-return
    }

    async generateToken(user) {
        const token = await this.jwtService.signAsync(user)
        return token
    }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOneByEmail(username)

        if (!user) {
            return null
        }

        const match = this.compareRaw(password, user.password)
        // const match = await this.comparePassword(password, user.password)

        if (!match) {
            return null
        }

        return user
    }

    async login(user) {
        const token = await this.generateToken(user)
        return { user, token }
    }

    async create(user) {
        const pass = await this.hashPassword(user.password) // eslint-disable-line @typescript-eslint/no-unsafe-member-access
        const newUser = await this.userService.create({ ...user, password: pass })
        const token = await this.generateToken(newUser)

        return { user: newUser, token }
    }
}
