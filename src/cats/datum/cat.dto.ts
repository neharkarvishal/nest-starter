/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger'

import { Exclude } from 'class-transformer'
import {
    IsInt,
    IsString,
    MinLength,
    IsNotEmpty,
    IsPositive,
    IsOptional,
} from 'class-validator'

export interface ICat {
    readonly name: string
    readonly age: number
    readonly breed: string
}

export class CreateCatDto implements ICat {
    @ApiProperty({ description: 'The name of the Cat', example: 'Kitty' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    readonly name: string

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

export class UpdateCatDto implements Partial<ICat> {
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

    @ApiProperty({ description: 'The name of the Cat', example: 'Kitty' })
    name: string

    @ApiProperty({ description: 'The age of the Cat', example: 1 })
    age: number

    @ApiProperty({ description: 'The breed of the Cat', example: 'Maine Coon' })
    breed: string

    @Exclude()
    readonly createdAt: any

    @Exclude()
    readonly updatedAt: any

    @Exclude()
    readonly deletedAt: any
}
