/* eslint-disable no-use-before-define */
import { Body, Controller, Post } from '@nestjs/common'

import { EmailScheduleDto } from './emailSchedule.dto'
import EmailSchedulingService from './emailScheduling.service'

@Controller(EmailSchedulingController.path)
export default class EmailSchedulingController {
    static path = 'email-scheduling'

    constructor(readonly emailSchedulingService: EmailSchedulingService) {}

    @Post('schedule')
    async scheduleEmail(@Body() emailSchedule: EmailScheduleDto) {
        this.emailSchedulingService.scheduleEmail(emailSchedule)
    }
}
