/* eslint-disable no-use-before-define */
import { ApiProperty } from '@nestjs/swagger'

import { Type } from 'class-transformer'
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    PrimaryColumn,
    Index,
    VersionColumn,
    JoinColumn,
} from 'typeorm'
import type { EntityOptions } from 'typeorm'

import { User } from '../../users/datum/user.entity' // eslint-disable-line import/no-cycle

@Entity(Cat.options)
export class Cat {
    public static options: EntityOptions = { name: 'cats' }

    public static exclude = ['version', 'createdAt', 'updatedAt', 'deletedAt']

    @ApiProperty({ description: 'Cat unique ID', example: 1 })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ description: 'ID of the Owner', example: 1 })
    @Column()
    userId: number

    @ApiProperty({ description: 'The name of the Cat', example: 'Kitty' })
    @Column()
    name: string

    @ApiProperty({ description: 'The age of the Cat', example: 1 })
    @Column()
    age: number

    @ApiProperty({ description: 'The breed of the Cat', example: 'Maine Coon' })
    @Column()
    breed: string

    /**
     * Meta
     */

    @VersionColumn({ default: 1, select: false, nullable: true })
    version: number

    @CreateDateColumn({ nullable: true })
    createdAt: Date

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date | null

    /**
     * Relations
     */

    @ManyToOne(() => User, (u) => u.cats, {
        lazy: false, // true sets relation to be lazy, lazy relations are promise of that entity
        nullable: false, // if relation column value can be nullable or not, {LEFT JOIN <-> INNER JOIN}?
    })
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    @Type(() => User)
    user: User
}
