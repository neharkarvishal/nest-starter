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
} from 'typeorm'

import { User } from '../../users/datum/user.entity' // eslint-disable-line import/no-cycle

@Entity({ name: 'cats' })
export class Cat {
    public static readonly NAME_LENGTH = 36

    public static exclude = ['createdAt', 'updatedAt', 'deletedAt']

    @ApiProperty({ description: 'Cat unique ID', example: '36635263' })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ description: 'The name of the Cat', example: 'Kitty' })
    @Column({ name: 'cat_name', length: Cat.NAME_LENGTH })
    name: string

    @ApiProperty({ description: 'The age of the Cat', example: 1 })
    @Column({ name: 'cat_age' })
    age: number

    @ApiProperty({ description: 'The breed of the Cat', example: 'Maine Coon' })
    @Column({ name: 'cat_breed' })
    breed: string

    @CreateDateColumn()
    createdAt: any

    @UpdateDateColumn()
    updatedAt: any

    @DeleteDateColumn()
    deletedAt: any

    /**
     * Relations
     */

    @ManyToOne((type) => User, (u) => u.cats)
    @Type((t) => User)
    user: User
}
