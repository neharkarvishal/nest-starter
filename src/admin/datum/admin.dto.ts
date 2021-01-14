/* eslint-disable max-classes-per-file */
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'

import { Exclude } from 'class-transformer'
import {
    IsString,
    MinLength,
    IsNotEmpty,
    IsOptional,
    MaxLength,
    IsEmail,
} from 'class-validator'

export class CreateAdminDto {
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
}

export class UpdateAdminDto {
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
}

export class GetAdminResponseDto {
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
