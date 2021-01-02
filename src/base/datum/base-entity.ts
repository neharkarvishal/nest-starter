/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger'

import {
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    DeleteDateColumn,
    VersionColumn,
} from 'typeorm'

export abstract class BaseEntity {
    public static exclude = [
        'password',
        'version',
        'createdAt',
        'updatedAt',
        'deletedAt',
    ]

    @ApiProperty({ description: 'Unique ID', example: 1 })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: '2000-01-01T12:00:00.000Z' })
    @VersionColumn({
        default: 1,
        select: false,
        nullable: true,
    })
    version?: number

    @ApiProperty({ example: '2000-01-01T12:00:00.000Z' })
    @CreateDateColumn({ nullable: true })
    createdAt?: Date

    @ApiProperty({ example: '2000-01-01T12:00:00.000Z' })
    @UpdateDateColumn({ nullable: true })
    updatedAt?: Date

    @ApiProperty({ example: '2000-01-01T12:00:00.000Z' })
    @DeleteDateColumn({ nullable: true })
    deletedAt?: Date | null
}
