import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export default class EmailService {
    constructor(
        private readonly configService: ConfigService<EnvironmentVariables>,
    ) {}

    // TODO: Implement this
    sendMail(options) {
        console.log({ options, config: this.configService.get('NODE_ENV') })
    }
}
