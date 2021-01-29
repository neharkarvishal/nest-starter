import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { EmailScheduleDto } from './emailSchedule.dto'
import EmailSchedulingService from './emailScheduling.service'

@ApiTags(EmailSchedulingController.name)
@Controller(EmailSchedulingController.path)
export default class EmailSchedulingController {
    static path = 'email-scheduling'

    constructor(readonly emailSchedulingService: EmailSchedulingService) {}

    // eslint-disable-next-line @typescript-eslint/require-await
    @Post('schedule')
    async scheduleEmail(@Body() emailSchedule: EmailScheduleDto) {
        await this.emailSchedulingService.scheduleEmail(emailSchedule)
    }
}
