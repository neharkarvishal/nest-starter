import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiProperty, ApiTags } from '@nestjs/swagger'

import { IsNotEmpty } from 'class-validator'
import type { Request } from 'express'

import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'

export class UserLoginDto {
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

    /**
     * Login
     */
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(
        @Req() req: Request,
        @Body() userLoginDto: UserLoginDto,
    ): Promise<{
        data: { token: string; expiresIn: number }
        statusCode: HttpStatus
    }> {
        const { user } = req
        const { email, password } = userLoginDto

        const data = await this.authService.login(user)

        return {
            data,
            statusCode: HttpStatus.OK,
        }
    }

    /**
     * Google Login
     *
     * No-op function as `@UseGuards(AuthGuard('google'))` takes care of login
     */
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {} // eslint-disable-line @typescript-eslint/no-empty-function

    /**
     * Google Login Callback
     */
    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req: Request, @Res() res) {
        if (process.env.NODE_ENV !== 'production') return req.user

        if (req.user.token)
            return res.redirect(
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `${process.env.HOST}:${process.env.PORT}/#/sign-in/success?jwt=${req.user.token}`,
            )

        return res.redirect(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `${process.env.host}:${process.env.port}/#/auth/register`,
        )
    }
}
