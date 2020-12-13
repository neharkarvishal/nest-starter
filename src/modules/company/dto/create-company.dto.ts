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
