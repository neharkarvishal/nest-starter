/* eslint-disable no-use-before-define */
import { Type } from 'class-transformer'
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm'
import type { EntityOptions } from 'typeorm'

import { BaseEntity } from '../../base'
import { User } from '../../users/datum/user.entity' // eslint-disable-line import/no-cycle

@Entity(Cat.options)
export class Cat extends BaseEntity {
    public static options: EntityOptions = { name: 'cats' }

    @Column()
    userId: number

    @Column()
    name: string

    @Column()
    age: number

    @Column()
    breed: string

    /*
     * Relations
     */

    @ManyToOne(() => User, (u) => u.cats, {
        lazy: false, // true sets relation to be lazy, lazy relations are promise of that entity
        nullable: true,
    })
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    @Type(() => User)
    user: User
}
