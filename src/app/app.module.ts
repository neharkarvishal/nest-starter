/* eslint-disable no-console,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */
import { Module, OnModuleInit, OnApplicationShutdown } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TerminusModule } from '@nestjs/terminus'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PinoLogger, LoggerModule } from 'nestjs-pino'

import * as Joi from '@hapi/joi'

import { HealthController } from '../health/health.controller'
import { AppController } from './app.controller'
import { AppService } from './app.service'

const ConfigModuleOptions = {
    isGlobal: true,
    validationOptions: {
        allowUnknown: true,
        abortEarly: true,
    },
    validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string()
            .valid('development', 'production', 'test', 'provision')
            .default('development'),
    }),
}

const LoggerModuleOptions = {
    pinoHttp: {
        prettyPrint: {
            colorize: true,
            levelFirst: false, // Display the log level name before the logged date and time
            translateTime: true,
            messageFormat: '{msg}', // 'pid', 'msg', 'level'
            ignore: 'pid,hostname',
            errorLikeObjectKeys: ['err', 'error', 'errors'],
        },
    },
}

const TypeOrmModuleOptions = {
    type: 'sqlite' as const,
    database: 'database.sqlite',
    synchronize: true,
    logging: true,
}

@Module({
    imports: [
        ConfigModule.forRoot(ConfigModuleOptions),
        LoggerModule.forRoot(LoggerModuleOptions),
        TerminusModule, // Health module
        TypeOrmModule.forRoot(TypeOrmModuleOptions),
    ],
    controllers: [AppController, HealthController],
    providers: [AppService],
})
export class AppModule implements OnModuleInit, OnApplicationShutdown {
    constructor(private readonly logger: PinoLogger) {
        logger.setContext(AppModule.name)
    }

    onModuleInit(): void {
        this.logger.info(`ModuleInit - AppModule has been initialized.`)
    }

    onApplicationShutdown(signal?: string): void {
        this.logger.fatal(
            `ApplicationShutdown - AppModule has been shutdown with ${signal} signal`,
        )
    }
}
