/* eslint-disable no-use-before-define */
import { ApiProperty } from '@nestjs/swagger'

import { Type } from 'class-transformer'
import { Column, Entity, ManyToOne, JoinColumn, RelationId } from 'typeorm'
import type { EntityOptions } from 'typeorm'

import { BaseEntity } from '../../base'
import { User } from '../../users/datum/user.entity' // eslint-disable-line import/no-cycle

@Entity(Cat.options)
export class Cat extends BaseEntity {
    public static options: EntityOptions = { name: 'cats' }

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
