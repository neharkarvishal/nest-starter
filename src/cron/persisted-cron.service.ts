import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common'
import { Cron, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule'

/**
 * Each time the server restarts, this service finds the jobs from the table and restored them
 *
 * TODO: make a service to gracefully stop cron jobs on ApplicationShutdown
 */
@Injectable()
export class PersistedCronService implements OnApplicationBootstrap {
    logger = new Logger(PersistedCronService.name)

    constructor(private schedule: SchedulerRegistry) {}

    // NestJs hook invoked when the app bootstrapped
    async onApplicationBootstrap() {
        // TODO: Implement commented out flow

        /*
        const jobs = await Job.find() // the jobs are all saved in `Job` table.

        jobs.forEach((job) => {
            const cron = new CronJob(job.time, () => {}) // You can define the handler for each job type
            this.schedule.addCronJob(job.name, cron)
            cron.start()
        })
        */

        return Promise.resolve()
    }
}
