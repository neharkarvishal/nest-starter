/* eslint-disable max-classes-per-file */
import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'

import { ICat } from 'src/modules/cats/interfaces/cat.interface'

import { IsInt, IsString, MinLength, IsNotEmpty } from 'class-validator'

export class CreateCatDto implements ICat {
    @ApiProperty({ description: 'The name of the Cat', example: 'Kitty' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    readonly name: string

    @ApiProperty({ description: 'The age of the Cat', example: 1 })
    @IsInt()
    @IsNotEmpty()
    readonly age: number

    @ApiProperty({ description: 'The breed of the Cat', example: 'Maine Coon' })
    @IsString()
    @IsNotEmpty()
    readonly breed: string
}

export class UpdateCatDto extends PartialType(CreateCatDto) {}
