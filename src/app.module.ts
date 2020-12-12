/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */
import { Module, OnModuleInit, OnApplicationShutdown } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { TerminusModule } from '@nestjs/terminus'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PinoLogger, LoggerModule } from 'nestjs-pino'

import { AppController } from 'src/app.controller'
import { AppService } from 'src/app.service'
import { CronModule } from 'src/cron/cron.module'
import { HealthController } from 'src/health/health.controller'
import { CatsModule } from 'src/modules/cats/cats.module'
import { UsersModule } from 'src/modules/users/users.module'

import * as Joi from '@hapi/joi'

const ConfigModuleOptions = {
    isGlobal: true,
    validationOptions: {
        allowUnknown: true,
        abortEarly: true,
    },
    validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string()
            .required()
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
    entities: [`${__dirname}/**/*.entity.{ts,js}`],
    type: 'sqlite' as const,
    database: 'database.sqlite',
    synchronize: true,
    logging: true,
}

@Module({
    controllers: [AppController, HealthController],
    imports: [
        ConfigModule.forRoot(ConfigModuleOptions),
        LoggerModule.forRoot(LoggerModuleOptions),
        ScheduleModule.forRoot(),
        CronModule,
        TerminusModule, // Health module
        TypeOrmModule.forRoot(TypeOrmModuleOptions),
        CatsModule,
        UsersModule,
    ],
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
