/* eslint-disable max-classes-per-file */
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { GetManyDefaultResponse } from '@nestjsx/crud/lib/interfaces/get-many-default-response.interface'

import { Exclude } from 'class-transformer'
import {
    IsInt,
    IsString,
    MinLength,
    IsNotEmpty,
    IsPositive,
    IsOptional,
    MaxLength,
} from 'class-validator'

export class CreateCatDto {
    @ApiProperty({ description: 'The name of the Cat', example: 'Kitty' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(36)
    name: string

    @ApiProperty({ description: 'ID of the Owner', example: 1 })
    @IsInt()
    @IsNotEmpty()
    userId: number

    @ApiProperty({ description: 'The age of the Cat', example: 1 })
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    age: number

    @ApiProperty({ description: 'The breed of the Cat', example: 'Maine Coon' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(36)
    breed: string
}

export class UpdateCatDto {
    @ApiProperty({ description: 'The name of the Cat', example: 'Kitty' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(36)
    @IsOptional()
    name?: string

    @ApiProperty({ description: 'The age of the Cat', example: 1 })
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @IsOptional()
    age?: number

    @ApiProperty({ description: 'The breed of the Cat', example: 'Maine Coon' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(36)
    @IsOptional()
    breed?: string
}

export class GetCatResponseDto {
    @ApiProperty({ type: 'number' })
    id: string

    @ApiProperty({ description: 'ID of the Owner', example: 1 })
    userId: number

    @ApiProperty({ description: 'The name of the Cat', example: 'Kitty' })
    name: string

    @ApiProperty({ description: 'The age of the Cat', example: 1 })
    age: number

    @ApiProperty({ description: 'The breed of the Cat', example: 'Maine Coon' })
    breed: string

    @ApiHideProperty()
    @Exclude()
    version: any

    @ApiHideProperty()
    @Exclude()
    createdAt: any

    @ApiHideProperty()
    @Exclude()
    updatedAt: any

    @ApiHideProperty()
    @Exclude()
    deletedAt: any
}

export class GetManyCatResponseDto
    implements GetManyDefaultResponse<GetCatResponseDto> {
    count: number

    data: GetCatResponseDto[]

    page: number

    pageCount: number

    total: number
}
