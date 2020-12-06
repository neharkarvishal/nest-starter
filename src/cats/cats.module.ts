import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CatsController } from 'src/cats/cats.controller'
import { CatsService } from 'src/cats/cats.service'
import { Cat } from 'src/cats/entities/cat.entity'

@Module({
    controllers: [CatsController],
    imports: [TypeOrmModule.forFeature([Cat])],
    providers: [CatsService],
})
export class CatsModule {}
