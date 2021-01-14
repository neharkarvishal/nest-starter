/* eslint-disable no-use-before-define */
import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller(AppController.path)
@ApiTags(AppController.name)
export class AppController {
    static path = '/'

    @Get()
    getHello() {
        return 'Hello World!'
    }
}
