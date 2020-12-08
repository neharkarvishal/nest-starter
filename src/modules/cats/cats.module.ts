import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CatsController } from 'src/modules/cats/cats.controller'
import { CatsService } from 'src/modules/cats/cats.service'
import { Cat } from 'src/modules/cats/entities/cat.entity'

@Module({
    controllers: [CatsController],
    imports: [TypeOrmModule.forFeature([Cat])],
    providers: [CatsService],
})
export class CatsModule {}
