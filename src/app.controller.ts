/* eslint-disable no-use-before-define */
import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AppService } from './app.service'

@Controller(AppController.path)
@ApiTags(AppController.name)
export class AppController {
    static path = '/'

    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }
}
