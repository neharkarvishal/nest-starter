import { ApiProperty } from '@nestjs/swagger'

import { ICat } from 'apps/backend/src/cats/interfaces/cat.interface'

import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsPositive,
    IsString,
    MinLength,
} from 'class-validator'

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
