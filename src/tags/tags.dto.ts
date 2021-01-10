/* eslint-disable max-classes-per-file */
import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger'

import { Exclude } from 'class-transformer'
import {
    IsString,
    MinLength,
    IsNotEmpty,
    IsOptional,
    MaxLength,
} from 'class-validator'

export class CreateTagsDto {
    @ApiProperty({ example: 'tag1' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(36)
    name: string
}

export class UpdateTagsDto extends PartialType(CreateTagsDto) {}

export class GetTagsResponseDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

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
