import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'

import { HealthController } from '@app/health'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatsModule } from './cats/cats.module'

@Module({
    imports: [TerminusModule, CatsModule],
    controllers: [AppController, HealthController],
    providers: [AppService],
})
export class AppModule {}
