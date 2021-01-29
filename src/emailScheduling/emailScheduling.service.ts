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

    async scheduleEmail(emailSchedule: EmailScheduleDto) {
        const date = new Date(emailSchedule.date)

        const job = new CronJob(date, () => {
            this.emailService.sendMail({
                subject: emailSchedule.subject,
                text: emailSchedule.content,
                to: emailSchedule.recipient,
            })
        })

        this.scheduler.addCronJob(`${Date.now()}-${emailSchedule.subject}`, job)

        job.start()
        this.logger.log(`email job added at ${date.toLocaleDateString()}!`)
    }
}
