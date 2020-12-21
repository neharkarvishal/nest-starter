/* eslint-disable max-classes-per-file */
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'

import { Exclude } from 'class-transformer'
import {
    IsInt,
    IsString,
    MinLength,
    IsNotEmpty,
    IsPositive,
    IsOptional,
} from 'class-validator'

export class CreateCatDto {
    @ApiProperty({ description: 'The name of the Cat', example: 'Kitty' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    readonly name: string

    @ApiProperty({ description: 'ID of the Owner', example: 1 })
    @IsInt()
    @IsNotEmpty()
    readonly userId: number

    @ApiProperty({ description: 'The age of the Cat', example: 1 })
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    readonly age: number

    @ApiProperty({ description: 'The breed of the Cat', example: 'Maine Coon' })
    @IsString()
    @IsNotEmpty()
    readonly breed: string
}

export class UpdateCatDto {
    @ApiProperty({ description: 'The name of the Cat', example: 'Kitty' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @IsOptional()
    readonly name?: string

    @ApiProperty({ description: 'The age of the Cat', example: 1 })
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @IsOptional()
    readonly age?: number

    @ApiProperty({ description: 'The breed of the Cat', example: 'Maine Coon' })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly breed?: string
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
    createdAt: any

    @ApiHideProperty()
    @Exclude()
    updatedAt: any

    @ApiHideProperty()
    @Exclude()
    deletedAt: any
}
