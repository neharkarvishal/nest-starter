/* eslint-disable max-classes-per-file */
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger'

import { BaseEntityModel as IBaseEntityModel } from '@app/interfaces'

import {
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    DeleteDateColumn,
} from 'typeorm'

export abstract class Model {
    constructor(input?: any) {
        if (input) {
            Object.assign(this, input)
        }
    }
}

export abstract class Base extends Model implements IBaseEntityModel {
    @ApiPropertyOptional({ type: String })
    @PrimaryGeneratedColumn()
    id?: number

    @ApiProperty({
        type: 'string',
        format: 'date-time',
        example: '2000-01-01T12:00:00.000Z',
    })
    @CreateDateColumn()
    createdAt?: Date

    @ApiProperty({
        type: 'string',
        format: 'date-time',
        example: '2000-01-01T12:00:00.000Z',
    })
    @UpdateDateColumn()
    updatedAt?: Date

    @ApiProperty({
        type: 'string',
        format: 'date-time',
        example: '2000-01-01T12:00:00.000Z',
    })
    @DeleteDateColumn()
    deletedAt?: Date | null
}
