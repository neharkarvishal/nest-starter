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

import { User } from '../../users/datum/user.entity' // eslint-disable-line import/no-cycle

@Entity({ name: 'cats' })
export class Cat {
    public static readonly NAME_LENGTH = 36

    public static exclude = ['createdAt', 'updatedAt', 'deletedAt']

    @ApiProperty({ description: 'Cat unique ID', example: '36635263' })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ description: 'ID of the Owner', example: 1 })
    @Column()
    // @Index()
    userId: number

    @ApiProperty({ description: 'The name of the Cat', example: 'Kitty' })
    @Column({ name: 'cat_name', length: Cat.NAME_LENGTH })
    name: string

    @ApiProperty({ description: 'The age of the Cat', example: 1 })
    @Column({ name: 'cat_age' })
    age: number

    @ApiProperty({ description: 'The breed of the Cat', example: 'Maine Coon' })
    @Column({ name: 'cat_breed' })
    breed: string

    /**
     * Meta
     */

    @VersionColumn()
    version: number

    @CreateDateColumn()
    createdAt: any

    @UpdateDateColumn()
    updatedAt: any

    @DeleteDateColumn()
    deletedAt: any

    /**
     * Relations
     */

    @ManyToOne((type) => User, (u) => u.cats, {
        lazy: false, // true sets relation to be lazy, lazy relations are promise of that entity
        nullable: false, // if relation column value can be nullable or not, {LEFT JOIN <-> INNER JOIN}?
    })
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    @Type((t) => User)
    user: User
}
