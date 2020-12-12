/* eslint-disable @typescript-eslint/no-unsafe-assignment,no-use-before-define,@typescript-eslint/no-use-before-define */
import { Controller, Get, HttpStatus, OnModuleInit } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { AppService } from 'src/app.service'

@Controller()
@ApiTags(AppController.name)
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK })
    getHello(): string {
        return this.appService.getHello()
    }
}
