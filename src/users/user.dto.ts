/* eslint-disable max-classes-per-file */
import { PartialType } from '@nestjs/mapped-types'

export class UserDto {}

export class UpdateUserDto extends PartialType(UserDto) {}
