/* eslint-disable no-use-before-define,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,no-param-reassign */
import {
    Controller,
    Get,
    HttpCode,
    OnApplicationShutdown,
    OnModuleInit,
    MessageEvent,
    Sse,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiTags } from '@nestjs/swagger'
import {
    DNSHealthIndicator,
    HealthCheck,
    HealthCheckService,
} from '@nestjs/terminus'

import * as os from 'os'
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

    onModuleInit() {
        console.log(`ModuleInit - HealthController has been initialized.`, {
            config: this.config.get<string>('NODE_ENV'),
        })
    }

    onApplicationShutdown(signal?: string) {
        console.log(
            `ApplicationShutdown - HealthController has been shutdown with ${signal} signal`,
        )
    }
}
