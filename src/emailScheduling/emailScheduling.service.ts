import { Injectable, Logger } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'

import { CronJob } from 'cron'

import EmailService from '../email/email.service'
import { EmailScheduleDto } from './emailSchedule.dto'

@Injectable()
export default class EmailSchedulingService {
    logger = new Logger(EmailSchedulingService.name)

    constructor(
        readonly emailService: EmailService,
        readonly scheduler: SchedulerRegistry,
    ) {}

    // eslint-disable-next-line @typescript-eslint/require-await
    async scheduleEmail(emailSchedule: EmailScheduleDto) {
        const date = new Date(emailSchedule.date)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const job = new CronJob(date, () => {
            this.emailService.sendMail({
                subject: emailSchedule.subject,
                text: emailSchedule.content,
                to: emailSchedule.recipient,
            })
        })

        this.scheduler.addCronJob(`${Date.now()}-${emailSchedule.subject}`, job)

        job.start() // eslint-disable-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        this.logger.log(`email job added at ${date.toLocaleDateString()}!`)
    }
}
