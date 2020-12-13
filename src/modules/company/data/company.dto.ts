/* eslint-disable max-classes-per-file */
import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'

import {
    IsInt,
    IsString,
    MinLength,
    IsNotEmpty,
    IsPositive,
    IsOptional,
} from 'class-validator'

export class CreateCompanyDto {
    @ApiProperty({ description: 'The name of the Company', example: 'ACME' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    readonly name: string
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
