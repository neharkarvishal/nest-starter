import { Module } from '@nestjs/common'

import { CronService } from './cron.service'
import { PersistedCronService } from './persisted-cron.service'

/**
 * Cron module
 */
@Module({
    providers: [CronService, PersistedCronService],
})
export class CronModule {}
