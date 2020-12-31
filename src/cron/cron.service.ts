/* eslint-disable no-plusplus */
import { Injectable, Logger } from '@nestjs/common'
import { Cron, Interval, Timeout } from '@nestjs/schedule'

/**
 * `@Cron` are regular cron jobs
 *
 * `@Interval` To declare that a method should run at a (recurring) specified interval
 *
 * `@Timeout` To declare that a method should run (once) at a specified timeout
 */
@Injectable()
export class CronService {
    static count = 0

    logger = new Logger(CronService.name)

    times = 50000000

    fact16 = 20922789888000

    factorial(n) {
        if (n === 1) return 1
        return n * this.factorial(n - 1)
    }

    @Cron('60 * * * * *')
    handleCron() {
        CronService.count += 1
        this.logger.debug(
            `Called when the second is 60, current count is ${CronService.count}`,
        )

        let ok = true
        for (let i = 0; i < this.times; i++) {
            // ok = ok && this.factorial(16) === this.fact16
        }
        this.logger.debug(`node.js finish ${this.times} - ${ok ? 'ok' : 'fail'}`)
    }

    @Interval(100000)
    handleInterval() {
        this.logger.debug('Called every 100 seconds')

        let ok = true
        for (let i = 0; i < this.times; i++) {
            // ok = ok && this.factorial(16) === this.fact16
        }
        this.logger.debug(`node.js finish ${this.times} - ${ok ? 'ok' : 'fail'}`)
    }

    @Timeout(50000)
    handleTimeout() {
        this.logger.debug('Called once after 50 seconds')

        let ok = true
        for (let i = 0; i < this.times; i++) {
            // ok = ok && this.factorial(16) === this.fact16
        }
        this.logger.debug(`node.js finish ${this.times} - ${ok ? 'ok' : 'fail'}`)
    }
}
