import { Injectable, Logger } from '@nestjs/common'
import { Cron, Interval, Timeout } from '@nestjs/schedule'

@Injectable()
export class CronService {
    public static count = 0

    private readonly logger = new Logger(CronService.name)

    @Cron('60 * * * * *')
    handleCron() {
        CronService.count += 1
        this.logger.debug(
            `Called when the second is 60, current count is ${CronService.count}`,
        )
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
