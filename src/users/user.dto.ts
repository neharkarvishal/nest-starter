import { PartialType } from '@nestjs/swagger'

import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator'

import { IsEmailExists } from '../infra/validator/isEmailExists'
import { IUser } from './user.interface'

/**
 * Data Transfer Object
 */
export class CreateUserDto implements IUser {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(36)
    username!: string

    @IsEmail()
    @IsNotEmpty()
    @MinLength(2)
    @IsEmailExists({ message: 'Email exists' })
    email!: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password!: string

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    firstName?: string

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    lastName?: string

    @IsBoolean()
    isActive!: boolean
}

/**
 * Data Transfer Object
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
