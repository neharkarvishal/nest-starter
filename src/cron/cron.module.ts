import { Module } from '@nestjs/common'

import { CronService } from './cron.service'
import { PersistedCronService } from './persisted-cron.service'

@Module({
    providers: [CronService, PersistedCronService],
})
export class CronModule {}
