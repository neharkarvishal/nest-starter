import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'

/**
 * Auth module
 */
@Module({
    imports: [
        ConfigModule,
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (
                configService: ConfigService<EnvironmentVariables>,
                // eslint-disable-next-line @typescript-eslint/require-await
            ) => ({
                secret: configService.get('JWTKEY'),
                signOptions: {
                    expiresIn: configService.get('TOKEN_EXPIRATION'),
                },
            }),
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [PassportModule, JwtModule],
})
export class AuthModule {}
