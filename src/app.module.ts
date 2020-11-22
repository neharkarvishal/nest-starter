import { Module, OnModuleInit, OnApplicationShutdown } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HealthController } from './health/health.controller'

@Module({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    imports: [TerminusModule],
    controllers: [AppController, HealthController],
    providers: [AppService],
})
export class AppModule implements OnModuleInit, OnApplicationShutdown {
    onModuleInit(): void {
        console.log(`ModuleInit - AppModule has been initialized.`)
    }

    onApplicationShutdown(signal?: string): void {
        console.log(`ApplicationShutdown - AppModule has been shutdown with ${signal} signal`)
    }
}
