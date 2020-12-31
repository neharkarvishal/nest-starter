/* eslint-disable no-use-before-define,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,no-param-reassign */
import {
    Controller,
    Get,
    HttpCode,
    OnApplicationShutdown,
    OnModuleInit,
    MessageEvent,
    Res,
    Sse,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiTags } from '@nestjs/swagger'
import {
    DNSHealthIndicator,
    HealthCheck,
    HealthCheckService,
} from '@nestjs/terminus'

import { readFileSync } from 'fs'
import * as os from 'os'
import { join } from 'path'
import * as pidusage from 'pidusage'
import { interval, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@ApiTags(HealthController.name)
@Controller(HealthController.path)
export class HealthController implements OnModuleInit, OnApplicationShutdown {
    static path = 'health'

    constructor(
        private health: HealthCheckService,
        private dns: DNSHealthIndicator,
        private config: ConfigService<EnvironmentVariables>,
    ) {}

    @Get()
    index(@Res() response) {
        response
            // @ts-ignore
            .type('text/html')
            .send(readFileSync(join(__dirname, 'sse.html')).toString())
    }

    @Sse('sse')
    sse(): Observable<MessageEvent> {
        const metrics = {
            os: {},
            interval: 1, // Every 1 second
            retention: 60, // Keep 60 datapoints in memory
        }

        return interval(5000).pipe(
            map((_) => {
                this.collectOsMetrics(metrics)

                return { data: metrics }
            }),
        )
    }

    @Get()
    @HttpCode(200)
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

    collectOsMetrics(metrics) {
        pidusage(process.pid, (err, stat) => {
            if (err) return

            // Convert from B to MB
            stat.memory = stat.memory / 1024 / 1024
            stat.load = os.loadavg()
            stat.timestamp = Date.now()

            metrics.os = stat
        })
    }
}
