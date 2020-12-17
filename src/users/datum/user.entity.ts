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
} from 'typeorm'

import { Cat } from '../../cats/datum/cat.entity' // eslint-disable-line import/no-cycle

@Entity({ name: 'users' })
export class User {
    public static readonly NAME_LENGTH = 36

    public static exclude = ['createdAt', 'updatedAt', 'deletedAt']

    @ApiProperty({ description: 'User unique ID', example: '36635263' })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ description: 'The name of the User', example: 'Name' })
    @Column({ name: 'user_name', length: User.NAME_LENGTH })
    name: string

    @CreateDateColumn()
    createdAt: any

    @UpdateDateColumn()
    updatedAt: any

    @DeleteDateColumn()
    deletedAt: any

    /**
     * Relations
     */

    @OneToMany((type) => Cat, (c) => c.user)
    @Type((t) => Cat)
    cats: Cat[]
}
