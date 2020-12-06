/* eslint-disable */
import { Body, Controller, Get, Param, Post, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { CatsService } from 'src/cats/cats.service'
import { CreateCatDto, CatDto } from 'src/cats/dto/cat.dto'
import { Cat as CatEntity } from 'src/cats/entities/cat.entity'

@ApiTags(CatsController.name)
@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Post()
    @ApiOperation({ summary: 'Create cat' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Created Cat Successfully',
    })
    @ApiResponse({
        description: 'Forbidden',
        status: HttpStatus.FORBIDDEN,
    })
    async create(@Body() createCatDto: CreateCatDto) {
        return await this.catsService.create(createCatDto)
    }

    @Get()
    @ApiOperation({ summary: 'Get all Cats' })
    @ApiResponse({
        description: 'Array of all Cats Entities',
        isArray: true,
        status: HttpStatus.OK,
        type: CatDto,
    })
    async findAll(): Promise<CatDto[]> {
        return this.catsService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a Cats by id' })
    @ApiResponse({
        description: 'Entity of a Cats',
        isArray: false,
        status: HttpStatus.OK,
        type: CatDto,
    })
    findOne(@Param('id') id: number): Promise<CatDto> {
        return this.catsService.findOne(id)
    }
}
