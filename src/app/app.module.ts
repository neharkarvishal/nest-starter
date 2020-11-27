/* eslint-disable no-console */
import { Module, OnModuleInit, OnApplicationShutdown } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PinoLogger, LoggerModule } from 'nestjs-pino'

import { HealthController } from '../health/health.controller'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
    imports: [
        LoggerModule.forRoot({
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
        }),
        TerminusModule, // Health module
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'database.sqlite',
            synchronize: true,
            logging: true,
        }),
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
