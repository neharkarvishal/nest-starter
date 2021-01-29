import { Module } from '@nestjs/common'

import { EmailModule } from '../email/email.module'
import EmailSchedulingController from './emailScheduling.controller'
import EmailSchedulingService from './emailScheduling.service'

/**
 * Email scheduling module
 */
@Module({
    imports: [EmailModule],
    controllers: [EmailSchedulingController],
    providers: [EmailSchedulingService],
})
export class EmailSchedulingModule {}
