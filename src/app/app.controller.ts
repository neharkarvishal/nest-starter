/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, HttpStatus, OnModuleInit } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { AppService } from './app.service'

@Controller()
@ApiTags('AppController')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK })
    getHello(): string {
        return this.appService.getHello()
    }
}
