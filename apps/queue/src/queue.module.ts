import { Module } from '@nestjs/common'

import { QueueController } from 'apps/queue/src/queue.controller'
import { QueueService } from 'apps/queue/src/queue.service'

@Module({
    imports: [],
    controllers: [QueueController],
    providers: [QueueService],
})
export class QueueModule {}
