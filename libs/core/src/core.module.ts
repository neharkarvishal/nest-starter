import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [
        // TypeOrmModule.forRoot({
        //     entities: [`${__dirname}/../**/*.entity.{ts,js}`],
        //     type: 'sqlite' as const,
        //     database: 'database.sqlite',
        //     synchronize: true,
        //     logging: true,
        // }),
    ],
    providers: [],
    exports: [],
})
export class CoreModule {}
