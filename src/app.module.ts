import { Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { TerminusModule } from '@nestjs/terminus'

import * as Joi from '@hapi/joi'

import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { CronModule } from './cron/cron.module'
import { DatabaseModule } from './database/database.module'
import { HealthController } from './health/health.controller'
import { TagsModule } from './tags/tags.module'
import { UsersModule } from './users/users.module'

const ConfigModuleOptions = {
    isGlobal: true,
    validationOptions: {
        allowUnknown: true,
        abortEarly: true,
    },
    /* eslint-disable */
    validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string()
            .required()
            .valid('development', 'production', 'test', 'provision')
            .default('development'),

        JWTKEY: Joi.string().required(),
        TOKEN_EXPIRATION: Joi.string().required(),

        database: Joi.string().required(),
        type: Joi.string().required(),
        logging: Joi.string().required(),
        synchronize: Joi.string().required(),
    }),
    /* eslint-enable */
}

@Module({
    controllers: [AppController, HealthController],
    imports: [
        ConfigModule.forRoot(ConfigModuleOptions),
        DatabaseModule,
        ScheduleModule.forRoot(), // CronModules deps
        // CronModule,
        TerminusModule, // Health module
        AuthModule,
        TagsModule,
        UsersModule,
    ],
    providers: [],
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
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `ApplicationShutdown - AppModule has been shutdown with ${signal} signal`,
        )
    }
}
