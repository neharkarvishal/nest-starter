import { Body, Controller, HttpStatus, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiProperty, ApiTags } from '@nestjs/swagger'

import { IsNotEmpty } from 'class-validator'
import type { Request } from 'express'

import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'

export class LoginCredsDto {
    @ApiProperty({ example: 'admin@demo.com' })
    @IsNotEmpty()
    readonly email!: string

    @ApiProperty({ example: '12345678' })
    @IsNotEmpty()
    readonly password!: string
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
    async login(
        @Req() req: Request,
        @Body() loginCreds: LoginCredsDto,
    ): Promise<{ data: string; statusCode: HttpStatus }> {
        const { user } = req
        const { email, password } = loginCreds

        const data = await this.authService.login(user)

        return {
            data,
            statusCode: HttpStatus.OK,
        }
    }
}
