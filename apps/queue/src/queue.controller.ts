import { Controller, Get } from '@nestjs/common'

import { QueueService } from 'apps/queue/src/queue.service'

@Controller('queue')
export class QueueController {
    constructor(private readonly queueService: QueueService) {}

    @Get()
    getHello(): string {
        return this.queueService.getHello()
    }
}
