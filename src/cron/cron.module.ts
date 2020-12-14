import { Module } from '@nestjs/common'

import { CronService } from 'src/cron/cron.service'

@Module({
    providers: [CronService],
})
export class CronModule {}
