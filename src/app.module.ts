/* eslint-disable */
import { Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { TerminusModule } from '@nestjs/terminus'
import { TypeOrmModule } from '@nestjs/typeorm'

import * as Joi from '@hapi/joi'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatsModule } from './cats/cats.module'
import { CronModule } from './cron/cron.module'
import { HealthController } from './health/health.controller'
import { UsersModule } from './users/users.module'
import { StatusMonitorModule } from 'nest-status-monitor'

const MonitoringModuleOptions = {
    pageTitle: 'Nest.js Monitoring Page',
    port: 3000,
    path: '/status',
    ignoreStartsWith: '/health/alive',
    spans: [
        {
            interval: 1, // Every 0.5 second
            retention: 60, // Keep 60 datapoints in memory
        },
        {
            interval: 3,
            retention: 60,
        },
        {
            interval: 9,
            retention: 60,
        },
    ],
    chartVisibility: {
        cpu: true,
        mem: true,
        load: true,
        responseTime: true,
        rps: true,
        statusCodes: true,
    },
    healthChecks: [
        {
            protocol: 'http',
            host: 'localhost',
            path: '/health/alive',
            port: 3000,
        },
        {
            protocol: 'http',
            host: 'localhost',
            path: '/health/dead',
            port: 3000,
        },
    ],
}

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
        // DB
        database: Joi.string().required(),
        type: Joi.string().required(),
        logging: Joi.string().required(),
        synchronize: Joi.string().required(),
    }),
}

// TODO: https://github.com/GauSim/nestjs-typeorm/blob/master/code/src/scripts/write-type-orm-config.ts,
//  https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f
const TypeOrmModuleOptions = {
    // following field actually sets the connection name when calling `forRootAsync`,
    // not the other one in `useFactory`
    name: 'default',
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
        // 1 = true, 0 = false, cuz they get parsed to strings, so we `!!parseInt(var)` it for bool; hax, lol
        synchronize: !!parseInt(config.get('synchronize'), 10),
        logging: !!parseInt(config.get('logging'), 10),

        // entities: [`${__dirname}/entity/*.{js,ts}`],
        // subscribers: [`${__dirname}/subscriber/*.{js,ts}`],
        // migrations: [`${__dirname}/migration/*.{js,ts}`],
    }),
}

@Module({
    controllers: [AppController, HealthController],
    imports: [
        ConfigModule.forRoot(ConfigModuleOptions),
        TypeOrmModule.forRootAsync(TypeOrmModuleOptions),
        ScheduleModule.forRoot(), // CronModules deps
        CronModule,
        TerminusModule, // Health module
        StatusMonitorModule.setUp(MonitoringModuleOptions),
        CatsModule,
        UsersModule,
    ],
    providers: [AppService],
})
export class AppModule implements OnModuleInit, OnApplicationShutdown {
    // kill -15
    // // eslint-disable-next-line @typescript-eslint/no-misused-promises
    // process.on('SIGTERM', async () => {
    //     console.warn("process.on('SIGTERM')")
    //
    //     setTimeout(() => process.exit(1), 5000)
    //     await app.close()
    //     process.exit(0)
    // })
    //
    // // eslint-disable-next-line @typescript-eslint/no-misused-promises
    // process.on('SIGINT', async () => {
    //     console.warn("process.on('SIGINT')")
    //
    //     setTimeout(() => process.exit(1), 5000)
    //     await app.close()
    //     process.exit(0)
    // })

    onModuleInit(): void {
        console.info(`ModuleInit - AppModule has been initialized.`)
    }

    onApplicationShutdown(signal?: string): void {
        console.error(
            `ApplicationShutdown - AppModule has been shutdown with ${signal} signal`,
        )
    }
}
