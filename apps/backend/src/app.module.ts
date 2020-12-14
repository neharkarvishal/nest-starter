import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TerminusModule } from '@nestjs/terminus'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { CoreModule } from '@app/core'
import { CronModule } from '@app/cron/cron.module'
import { HealthController } from '@app/health'

import { AppController } from 'apps/backend/src/app.controller'
import { AppService } from 'apps/backend/src/app.service'
import { CatsModule } from 'apps/backend/src/cats/cats.module'

import { Cat } from 'apps/backend/src/cats/entities/cat.entity'

const TypeOrmModuleOptions = {
    entities: [Cat, `${__dirname}/../**/*.entity.{ts,js}`],
    type: 'sqlite' as const,
    database: 'database.sqlite',
    synchronize: true,
    logging: true,
}

@Module({
    imports: [
        TerminusModule,
        TypeOrmModule.forRoot(TypeOrmModuleOptions),
        CoreModule,
        CatsModule,
        ScheduleModule.forRoot(),
        CronModule,
    ],
    controllers: [AppController, HealthController],
    providers: [AppService],
})
export class AppModule {}
