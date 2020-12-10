import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'

import { HealthController } from '@app/health'

import { QueueController } from 'apps/queue/src/queue.controller'
import { QueueService } from 'apps/queue/src/queue.service'

@Module({
    imports: [TerminusModule],
    controllers: [QueueController, HealthController],
    providers: [QueueService],
})
export class QueueModule {}
