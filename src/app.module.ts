/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/require-await */
import { Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TerminusModule } from '@nestjs/terminus'

import * as Joi from '@hapi/joi'
import { join } from 'path'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CronModule } from './cron/cron.module'
import { DatabaseModule } from './database/database.module'
import { HealthController } from './health/health.controller'
import { TagsModule } from './tags/tags.module'

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

        database: Joi.string().required(),
        type: Joi.string().required(),
        logging: Joi.string().required(),
        synchronize: Joi.string().required(),
    }),
}

@Module({
    controllers: [AppController, HealthController],
    imports: [
        ConfigModule.forRoot(ConfigModuleOptions),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'redoc'),
            exclude: ['/api*'],
        }),
        DatabaseModule,
        ScheduleModule.forRoot(), // CronModules deps
        CronModule,
        TerminusModule, // Health module
        TagsModule,
    ],
    providers: [AppService],
})
export class AppModule implements OnModuleInit, OnApplicationShutdown {
    /*
     * When the application receives a termination signal it will call any registered
     * onModuleDestroy(), beforeApplicationShutdown(), then onApplicationShutdown() methods
     * (in the sequence described above) with the corresponding signal as the first parameter.
     * If a registered function awaits an asynchronous call (returns a promise), Nest will not
     * continue in the sequence until the promise is resolved or rejected.
     */

    onModuleInit(): void {
        console.info(`ModuleInit - AppModule has been initialized.`)
    }

    onApplicationShutdown(signal?: string): void {
        console.error(
            `ApplicationShutdown - AppModule has been shutdown with ${signal} signal`,
        )
    }
}
