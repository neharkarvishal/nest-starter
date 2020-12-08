/* eslint-disable no-use-before-define,@typescript-eslint/no-use-before-define */
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    HttpStatus,
    Delete,
    Put,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { CatsService } from 'src/modules/cats/cats.service'
import { CreateCatDto, UpdateCatDto } from 'src/modules/cats/dto/cat.dto'
import { Cat as CatEntity } from 'src/modules/cats/entities/cat.entity'

@ApiTags(CatsController.name)
@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Post()
    @ApiOperation({ summary: 'Create cat' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Created Cat Successfully',
        type: CatEntity,
    })
    @ApiResponse({
        description: 'Forbidden',
        status: HttpStatus.FORBIDDEN,
    })
    async create(@Body() createCatDto: CreateCatDto): Promise<CatEntity> {
        return this.catsService.create(createCatDto)
    }

    @Get()
    @ApiOperation({ summary: 'Get all Cats' })
    @ApiResponse({
        description: 'Array of all Cats Entities',
        isArray: true,
        status: HttpStatus.OK,
        type: CatEntity,
    })
    async findAll(): Promise<CatEntity[]> {
        return this.catsService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a Cats by id' })
    @ApiResponse({
        description: 'Entity of a Cats',
        isArray: false,
        status: HttpStatus.OK,
        type: CatEntity,
    })
    async findOne(@Param('id') id: number): Promise<CatEntity> {
        return this.catsService.findOne(id)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a Cats by id' })
    @ApiResponse({
        description: 'Updating a Cats',
        isArray: false,
        status: HttpStatus.OK,
        type: CatEntity,
    })
    update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
        return this.catsService.update(id, updateCatDto)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a Cats by id' })
    @ApiResponse({
        description: 'Delete a Cats',
        isArray: false,
        status: HttpStatus.OK,
        type: CatEntity,
    })
    remove(@Param('id') id: number) {
        return this.catsService.remove(id)
    }
}
