import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import * as Knex from 'knex'

const providers = [
    {
        provide: 'KnexConnection',
        inject: [ConfigService],
        // eslint-disable-next-line @typescript-eslint/require-await
        useFactory: async (config: ConfigService<EnvironmentVariables>) => {
            return Knex({
                client: `sqlite3`,
                useNullAsDefault: true,
                connection: {
                    filename: `./${config.get('database')}`, // eslint-disable-line @typescript-eslint/restrict-template-expressions
                },
                debug: true,
            })
        },
    },
]

@Global()
@Module({
    providers: [...providers],
    exports: [...providers],
})
export class KnexModule {}
