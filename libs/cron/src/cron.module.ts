import { Module } from '@nestjs/common'

import { CronService } from '@app/cron/cron.service'

@Module({
    providers: [CronService], // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    exports: [CronService], // eslint-disable-line @typescript-eslint/no-unsafe-assignment
})
export class CronModule {}
