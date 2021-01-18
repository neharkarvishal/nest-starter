/* eslint-disable no-use-before-define */
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(36)
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string
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
    async login(@Body() user: LoginUserDto) {
        return this.authService.login(user)
    }

    // @ApiOperation({
    //     summary: 'Create a User',
    //     description: 'Create a new User and store it in database',
    // })
    // @Post('signup')
    // async signUp(@Body() user: CreateUserDto) {
    //     return this.userService.create(user)
    // }
}
