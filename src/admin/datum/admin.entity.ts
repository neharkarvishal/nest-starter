/* eslint-disable no-use-before-define */
import { Column, Entity, Generated } from 'typeorm'
import type { EntityOptions } from 'typeorm'

import { BaseEntity } from '../../base'

@Entity(Admin.options)
export class Admin extends BaseEntity {
    public static options: EntityOptions = { name: 'admins' }

    @Column()
    @Generated('uuid')
    uuid: string

    @Column({ nullable: false })
    username: string

    @Column({
        nullable: false,
        // unique: true,
    })
    email: string

    @Column({ nullable: false, select: false })
    password: string
}
