/* eslint-disable no-use-before-define */
import { ApiProperty } from '@nestjs/swagger'

import { Exclude, Type } from 'class-transformer'
import { Column, Entity, OneToMany, EntityOptions, RelationId } from 'typeorm'

import { BaseEntity } from '../../base'
import { Cat } from '../../cats/datum/cat.entity' // eslint-disable-line import/no-cycle

@Entity(User.options)
export class User extends BaseEntity {
    public static options: EntityOptions = { name: 'users' }

    @Column({ nullable: false, unique: true })
    username: string

    @Column({ nullable: false, unique: true })
    email: string

    @Column({ nullable: false, select: false })
    password: string

    @Column({ nullable: false })
    firstName: string

    @ApiProperty({ example: 'Middle' })
    @Column({ nullable: true })
    middleName: string

    @ApiProperty({ example: 'Last' })
    @Column({ nullable: false })
    lastName: string

    /*
     * Relations
     */

    @RelationId((user: User) => user.cats) // these are virtual and not stored in db
    catIds: number[]

    @OneToMany(() => Cat, (c) => c.user, {
        lazy: false, // true sets relation to be lazy, lazy relations are promise of that entity
        nullable: false, // if relation column value can be nullable or not, {LEFT JOIN <-> INNER JOIN}?}
    })
    @Type(() => Cat)
    cats: Cat[]
}
