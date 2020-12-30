/* eslint-disable max-classes-per-file */
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'

import { Exclude } from 'class-transformer'
import {
    IsString,
    MinLength,
    IsNotEmpty,
    IsOptional,
    MaxLength,
} from 'class-validator'

export class CreateUserDto {
    @ApiProperty({ description: 'The name of the User', example: 'Name' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(36)
    readonly name: string
}

export class UpdateUserDto {
    @ApiProperty({ description: 'The name of the User', example: 'Kitty' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(36)
    @IsOptional()
    readonly name?: string
}

export class GetUserResponseDto {
    @ApiProperty({ type: 'number' })
    id: string

    @ApiProperty({ description: 'The name of the User', example: 'Name' })
    name: string

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
