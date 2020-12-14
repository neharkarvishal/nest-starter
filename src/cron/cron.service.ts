import { Injectable, Logger } from '@nestjs/common'
import { Cron, Interval, Timeout } from '@nestjs/schedule'

@Injectable()
export class CronService {
    private readonly logger = new Logger(CronService.name)

    @Cron('60 * * * * *')
    handleCron() {
        this.logger.debug('Called when the second is 60')
    }

    @Interval(100000)
    handleInterval() {
        this.logger.debug('Called every 100 seconds')
    }

    @Timeout(50000)
    handleTimeout() {
        this.logger.debug('Called once after 50 seconds')
    }
}
