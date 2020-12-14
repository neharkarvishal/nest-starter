import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { Cat } from 'apps/backend/src/cats/entities/cat.entity'

const entities = [Cat]

@Module({
    imports: [
        // TypeOrmModule.forRoot({
        //     useFactory: (): TypeOrmModuleOptions => ({
        //         entities,
        //         type: 'sqlite' as const,
        //         database: 'database.sqlite',
        //         synchronize: true,
        //         logging: true,
        //     }),
        // }),
    ],
    controllers: [],
    providers: [],
})
export class CoreModule {}
