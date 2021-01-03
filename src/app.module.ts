/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/require-await */
import { Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TerminusModule } from '@nestjs/terminus'
import { TypeOrmModule } from '@nestjs/typeorm'

import * as Joi from '@hapi/joi'
import { join } from 'path'

import { AdminModule } from './admin/admin.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatsModule } from './cats/cats.module'
import { CronModule } from './cron/cron.module'
import { HealthController } from './health/health.controller'
import { UsersModule } from './users/users.module'

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

// TODO: https://github.com/GauSim/nestjs-typeorm/blob/master/code/src/scripts/write-type-orm-config.ts,
//  https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f

export const TypeOrmModuleOptions = {
    name: 'default', // following field actually sets the connection name when calling `forRootAsync`, not the other one in `useFactory`
    inject: [ConfigService],
    useFactory: async (config: ConfigService<EnvironmentVariables>) => ({
        name: 'default', // this field is ignored when calling forRootAsync
        type: config.get('type'),
        database: config.get('database'),
        entities: [`dist/**/*.entity.js`],
        migrations: [`dist/migration/**/*.js`],
        subscribers: [`dist/subscriber/**/*.js`],
        migrationsTableName: 'migrations_typeorm',
        cli: {
            entitiesDir: 'src/entity',
            migrationsDir: 'src/migration',
            subscribersDir: 'src/subscriber',
        },
        synchronize: !!parseInt(config.get('synchronize'), 10),
        logging: !!parseInt(config.get('logging'), 10), // 1 = true, 0 = false, cuz they get parsed to strings, so we `!!parseInt(var)` it for bool; hax, lol
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
        TypeOrmModule.forRootAsync(TypeOrmModuleOptions),
        ScheduleModule.forRoot(), // CronModules deps
        CronModule,
        TerminusModule, // Health module
        AdminModule,
        CatsModule,
        UsersModule,
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
