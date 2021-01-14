/* eslint-disable max-classes-per-file */
import {
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    DeleteDateColumn,
    VersionColumn,
} from 'typeorm'

export abstract class BaseEntity {
    // to be excluded from response
    public static exclude = [
        'password',
        'version',
        'createdAt',
        'updatedAt',
        'deletedAt',
    ]

    @PrimaryGeneratedColumn()
    id: number

    @VersionColumn({
        default: 1,
        select: false,
        nullable: true,
    })
    version?: number

    @CreateDateColumn({ select: false, nullable: true })
    createdAt?: Date | null

    @UpdateDateColumn({ select: false, nullable: true })
    updatedAt?: Date | null

    @DeleteDateColumn({ select: false, nullable: true })
    deletedAt?: Date | null
}
