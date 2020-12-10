import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TerminusModule } from '@nestjs/terminus'

import { CronModule } from '@app/cron/cron.module'
import { HealthController } from '@app/health'

import { QueueController } from 'apps/queue/src/queue.controller'
import { QueueService } from 'apps/queue/src/queue.service'

@Module({
    imports: [TerminusModule, ScheduleModule.forRoot(), CronModule], // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    controllers: [QueueController, HealthController],
    providers: [QueueService],
})
export class QueueModule {}
