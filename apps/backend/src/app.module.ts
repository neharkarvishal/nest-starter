import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TerminusModule } from '@nestjs/terminus'

import { CronModule } from '@app/cron/cron.module'
import { HealthController } from '@app/health'

import { AppController } from 'apps/backend/src/app.controller'
import { AppService } from 'apps/backend/src/app.service'
import { CatsModule } from 'apps/backend/src/cats/cats.module'

@Module({
    imports: [TerminusModule, CatsModule, ScheduleModule.forRoot(), CronModule],
    controllers: [AppController, HealthController],
    providers: [AppService],
})
export class AppModule {}
