/* eslint-disable no-use-before-define */
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'

@Controller(AuthController.path)
@ApiTags(AuthController.name)
export class AuthController {
    static path = 'auth'

    constructor(readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() user) {
        return this.authService.login(user)
    }

    @Post('signup')
    async signUp(@Body() user) {
        return this.authService.create(user)
    }
}
