/* eslint-disable no-console */
import { Module, OnModuleInit, OnApplicationShutdown } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { TypeOrmModule } from '@nestjs/typeorm'

import { HealthController } from '../health/health.controller'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
    imports: [
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
    onModuleInit(): void {
        console.log(`ModuleInit - AppModule has been initialized.`)
    }

    onApplicationShutdown(signal?: string): void {
        console.log(
            `ApplicationShutdown - AppModule has been shutdown with ${signal} signal`,
        )
    }
}
