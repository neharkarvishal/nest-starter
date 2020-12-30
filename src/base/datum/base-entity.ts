/* eslint-disable max-classes-per-file */
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger'

import {
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    DeleteDateColumn,
} from 'typeorm'

export interface IBaseEntityModel {
    id?: number

    readonly createdAt?: Date
    readonly updatedAt?: Date
    readonly deletedAt?: Date | null
}

export abstract class Model {
    constructor(input?: any) {
        if (input) {
            Object.assign(this, input)
        }
    }
}

export abstract class BaseEntity extends Model implements IBaseEntityModel {
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
