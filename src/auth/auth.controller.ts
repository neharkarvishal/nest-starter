/* eslint-disable no-use-before-define */
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiProperty, ApiTags } from '@nestjs/swagger'

import { IsNotEmpty } from 'class-validator'

import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'

export class LoginCredsDto {
    @ApiProperty({ example: 'admin@demo.com' })
    @IsNotEmpty()
    readonly email: string

    @ApiProperty({ example: '12345678' })
    @IsNotEmpty()
    readonly password: string
}

@Controller(AuthController.path)
@ApiTags(AuthController.name)
export class AuthController {
    static path = 'auth'

    constructor(
        readonly authService: AuthService,
        readonly userService: UsersService,
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req, @Body() loginCreds: LoginCredsDto) {
        const { user } = req
        const { email, password } = loginCreds // eslint-disable-line @typescript-eslint/no-unused-vars

        return this.authService.login(user)
    }
}
