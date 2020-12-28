/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,no-use-before-define */
import { Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TerminusModule } from '@nestjs/terminus'
import { TypeOrmModule } from '@nestjs/typeorm'

import * as Joi from '@hapi/joi'
import { join } from 'path'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatsModule } from './cats/cats.module'
import { Cat } from './cats/datum/cat.entity'
import { CronModule } from './cron/cron.module'
import { HealthController } from './health/health.controller'
import { User } from './users/datum/user.entity'
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
    }),
}

export const TypeOrmModuleOptions = {
    entities: [
        Cat,
        User,
        // `${__dirname}/**/*.entity.{ts,js}`,
    ],
    type: 'sqlite' as const,
    database: 'database.sqlite',
    synchronize: true,
    logging: true,
    // migrations: [`${__dirname}/**/migrations/*{.ts,.js}`],
    // migrationsTableName: 'migrations_typeorm',
    // migrationsRun: true,
}

@Module({
    controllers: [AppController, HealthController],
    imports: [
        ConfigModule.forRoot(ConfigModuleOptions),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'redoc'),
            exclude: ['/api*'],
        }),
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
    onModuleInit(): void {
        console.info(`ModuleInit - AppModule has been initialized.`)
    }

    onApplicationShutdown(signal?: string): void {
        console.error(
            `ApplicationShutdown - AppModule has been shutdown with ${signal} signal`,
        )
    }
}
