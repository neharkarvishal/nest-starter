import { Module } from '@nestjs/common'

import { CatsController } from 'apps/backend/src/cats/cats.controller'
import { CatsService } from 'apps/backend/src/cats/cats.service'

@Module({
    controllers: [CatsController],
    providers: [CatsService],
})
export class CatsModule {}
