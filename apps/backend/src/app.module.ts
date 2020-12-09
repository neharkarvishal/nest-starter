import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'

import { HealthController } from '@app/health'

import { AppController } from 'apps/backend/src/app.controller'
import { AppService } from 'apps/backend/src/app.service'
import { CatsModule } from 'apps/backend/src/cats/cats.module'

@Module({
    imports: [TerminusModule, CatsModule],
    controllers: [AppController, HealthController],
    providers: [AppService],
})
export class AppModule {}
