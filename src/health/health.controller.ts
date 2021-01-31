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
    DiskHealthIndicator,
    DNSHealthIndicator,
    HealthCheck,
    HealthCheckService,
    MemoryHealthIndicator,
} from '@nestjs/terminus'

import * as os from 'os'
// @ts-ignore
import * as pidusage from 'pidusage'
import { interval, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@ApiTags(HealthController.name)
@Controller(HealthController.path)
export class HealthController implements OnModuleInit, OnApplicationShutdown {
    static path = 'health'

    constructor(
        readonly config: ConfigService<EnvironmentVariables>,
        readonly memory: MemoryHealthIndicator,
        readonly health: HealthCheckService,
        readonly disk: DiskHealthIndicator,
        readonly dns: DNSHealthIndicator,
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
            async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
            async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
            async () =>
                this.dns.pingCheck('weather', 'https://samples.openweathermap.org'),
            async () =>
                this.disk.checkStorage('storage', {
                    thresholdPercent: 0.8,
                    path: '/',
                }),
        ])
    }

    collectOsMetrics(metrics: { os: any; interval?: number; retention?: number }) {
        pidusage(
            process.pid,
            (
                err: any,
                stat: { memory: number; timestamp: number; load: number[] },
            ) => {
                if (err) return

                // Convert from B to MB
                stat.memory = stat.memory / 1024 / 1024 // eslint-disable-line no-param-reassign
                stat.timestamp = Date.now() // eslint-disable-line no-param-reassign
                stat.load = os.loadavg() // eslint-disable-line no-param-reassign

                metrics.os = stat // eslint-disable-line no-param-reassign
            },
        )
    }

    onModuleInit() {
        console.log(`ModuleInit - HealthController has been initialized.`, {
            config: this.config.get<string>('NODE_ENV'),
        })
    }

    onApplicationShutdown(signal?: string) {
        console.log(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `ApplicationShutdown - HealthController has been shutdown with ${signal} signal`,
        )
    }
}
