import { Module } from '@nestjs/common'

import { UtilsService } from 'libs/utils/src/utils.service'

@Module({
    providers: [UtilsService],
    exports: [UtilsService],
})
export class UtilsModule {}
