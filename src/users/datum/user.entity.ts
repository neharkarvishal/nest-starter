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
    OneToMany,
    VersionColumn,
    EntityOptions,
} from 'typeorm'

import { Cat } from '../../cats/datum/cat.entity' // eslint-disable-line import/no-cycle

@Entity(User.options)
export class User {
    public static options: EntityOptions = { name: 'users' }

    public static exclude = ['createdAt', 'updatedAt', 'deletedAt']

    @ApiProperty({ description: 'User unique ID', example: 1 })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ description: 'The name of the User', example: 'Name' })
    @Column()
    name: string

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

    @OneToMany((type) => Cat, (c) => c.user, {
        lazy: false, // true sets relation to be lazy, lazy relations are promise of that entity
        nullable: false, // if relation column value can be nullable or not, {LEFT JOIN <-> INNER JOIN}?}
    })
    @Type((t) => Cat)
    cats: Cat[]
}
