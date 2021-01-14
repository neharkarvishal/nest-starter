/* eslint-disable max-classes-per-file */
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

import { Exclude } from 'class-transformer'
import {
    IsString,
    MinLength,
    IsNotEmpty,
    IsOptional,
    MaxLength,
    IsEmail,
} from 'class-validator'

export class CreateUserDto {
    @ApiProperty({ example: 'use1' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(36)
    username: string

    @ApiProperty({ example: 'user1@demo.com' })
    @IsEmail()
    @IsNotEmpty()
    @MinLength(2)
    email: string

    @ApiProperty({ example: 'password' })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string

    @ApiProperty({ example: 'First' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    firstName: string

    @ApiProperty({ example: 'Middle' })
    @IsOptional()
    middleName: string

    @ApiProperty({ example: 'Last' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    lastName: string
}

export class UpdateUserDto {
    @ApiProperty({ example: 'use1' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(36)
    username: string

    @ApiProperty({ example: 'password' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string

    @ApiProperty({ example: 'First' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    firstName: string

    @ApiPropertyOptional({ example: 'Middle' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    middleName: string

    @ApiProperty({ example: 'Last' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    lastName: string
}

export class GetUserResponseDto {
    @ApiProperty({ type: 'number' })
    id: string

    @ApiHideProperty()
    @Exclude()
    password: any

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
