/* eslint-disable no-use-before-define */
import {
    Controller,
    Get,
    OnApplicationShutdown,
    OnModuleInit,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiTags } from '@nestjs/swagger'
import {
    DNSHealthIndicator,
    HealthCheck,
    HealthCheckService,
} from '@nestjs/terminus'

@ApiTags(HealthController.name)
@Controller(HealthController.path)
export class HealthController implements OnModuleInit, OnApplicationShutdown {
    static path = 'health'

    constructor(
        private health: HealthCheckService,
        private dns: DNSHealthIndicator,
        private config: ConfigService,
    ) {}

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.dns.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
        ])
    }

    /*
     * When the application receives a termination signal it will call any registered
     * onModuleDestroy(), beforeApplicationShutdown(), then onApplicationShutdown() methods
     * (in the sequence described above) with the corresponding signal as the first parameter.
     * If a registered function awaits an asynchronous call (returns a promise), Nest will not
     * continue in the sequence until the promise is resolved or rejected.
     */

    onModuleInit(): void {
        console.log(`ModuleInit - HealthController has been initialized.`, {
            config: this.config.get<string>('NODE_ENV'),
        })
    }

    onApplicationShutdown(signal?: string): void {
        console.log(
            `ApplicationShutdown - HealthController has been shutdown with ${signal} signal`,
        )
    }
}
