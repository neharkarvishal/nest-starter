/* eslint-disable prefer-const */
import { Injectable, Logger } from '@nestjs/common'
import {
    Cron,
    CronExpression,
    Interval,
    SchedulerRegistry,
    Timeout,
} from '@nestjs/schedule'

import { CronJob } from 'cron'

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

    constructor(readonly scheduler: SchedulerRegistry) {}

    factorial(n: number): number {
        if (n === 1) return 1
        return n * this.factorial(n - 1)
    }

    @Cron(CronExpression.EVERY_MINUTE, { name: 'handleCronFn' })
    handleCron() {
        CronService.count += 1
        this.logger.debug(
            `Called when the second is 60, current count is ${CronService.count}`,
        )

        let ok = true
        for (let i = 0; i < this.times; i++) {
            ok = ok && this.factorial(16) === this.fact16
        }
        this.logger.debug(`node.js finish ${this.times} - ${ok ? 'ok' : 'fail'}`)
    }

    @Interval('handleIntervalFn', 100000)
    handleInterval() {
        this.logger.debug('Called every 100 seconds')

        let ok = true
        for (let i = 0; i < this.times; i++) {
            ok = ok && this.factorial(16) === this.fact16
        }
        this.logger.debug(`node.js finish ${this.times} - ${ok ? 'ok' : 'fail'}`)
    }

    @Timeout('handleTimeoutFn', 50000)
    handleTimeout() {
        this.logger.debug('Called once after 50 seconds')

        let ok = true
        for (let i = 0; i < this.times; i++) {
            ok = ok && this.factorial(16) === this.fact16
        }
        this.logger.debug(`node.js finish ${this.times} - ${ok ? 'ok' : 'fail'}`)
    }

    /**
     * Get all of the CRON jobs
     */
    logAllCrons() {
        const jobs = this.scheduler.getCronJobs()

        jobs.forEach((value, key, map) => {
            let next

            try {
                next = value.nextDates().toDate()
            } catch (e) {
                next = 'error: next fire date is in the past!'
            }
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            this.logger.log(`job: ${key} -> next: ${next}`)
        })
    }

    /**
     * Dynamically schedule a name CRON job
     * @param {string} name Job Name
     * @param {Number} seconds Seconds
     */
    addCronJob(name: string, seconds: string) {
        const job = new CronJob(`${seconds} * * * * *`, () => {
            this.logger.warn(`time (${seconds}) for job ${name} to run!`)
        })

        this.scheduler.addCronJob(name, job)
        job.start()

        this.logger.warn(`job ${name} added for each minute at ${seconds} seconds!`)
    }

    /**
     * Dynamically delete a named scheduled CRON job
     * @param {string} name Job Name
     */
    deleteCron(name: string) {
        const job = this.scheduler.getCronJob(name)

        if (job) {
            this.scheduler.deleteCronJob(name)
            this.logger.warn(`job ${name} deleted!`)
        } else {
            this.logger.warn(`job ${name} not found!`)
        }
    }

    /**
     * Get all of the Intervals
     */
    logIntervals() {
        const intervals = this.scheduler.getIntervals()
        intervals.forEach((key) => this.logger.log(`Interval: ${key}`))
    }

    /**
     * Dynamically schedule a named Interval
     * @param {string} name Interval Name
     * @param {Number} milliseconds Milliseconds
     */
    addInterval(name: string, milliseconds: number) {
        const callback = () => {
            this.logger.warn(
                `Interval ${name} executing at time (${milliseconds})!`,
            )
        }

        const interval = setInterval(callback, milliseconds)
        this.scheduler.addInterval(name, interval)
    }

    /**
     * Dynamically delete a named Interval
     * @param {string} name Interval Name
     */
    deleteInterval(name: string) {
        const interval = this.scheduler.getInterval(name)
        if (interval) {
            this.scheduler.deleteInterval(name)
            this.logger.warn(`Interval ${name} deleted!`)
        } else {
            this.logger.warn(`Interval ${name} not found!`)
        }
    }

    /**
     * Get all of the Timeouts
     */
    logTimeouts() {
        const timeouts = this.scheduler.getTimeouts()
        timeouts.forEach((key) => this.logger.log(`Timeout: ${key}`))
    }

    /**
     * Dynamically schedule a named Timeout
     * @param {string} name Timeout Name
     * @param {Number} milliseconds Milliseconds
     */
    addTimeout(name: string, milliseconds: number) {
        const callback = () => {
            this.logger.warn(`Timeout ${name} executing after (${milliseconds})!`)
        }

        const timeout = setTimeout(callback, milliseconds)
        this.scheduler.addTimeout(name, timeout)
    }

    /**
     * Dynamically delete a named Timeout
     * @param {string} name Timeout Name
     */
    deleteTimeout(name: string) {
        const timeout = this.scheduler.getTimeout(name)

        if (timeout) {
            this.scheduler.deleteTimeout(name)
            this.logger.warn(`Timeout ${name} deleted!`)
        } else {
            this.logger.warn(`Timeout ${name} not found!`)
        }
    }
}
