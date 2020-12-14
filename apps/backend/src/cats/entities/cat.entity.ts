import { ApiProperty } from '@nestjs/swagger'

import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm'
import { Base } from '@app/core/entities/base'

@Entity({ name: 'cats' })
export class Cat extends Base {
    public static readonly NAME_LENGTH = 36

    @ApiProperty({ description: 'The name of the Cat', example: 'Kitty' })
    @Column({ name: 'cat_name', length: Cat.NAME_LENGTH })
    name: string

    @ApiProperty({ description: 'The age of the Cat', example: 1 })
    @Column({ name: 'cat_age' })
    age: number

    @ApiProperty({ description: 'The breed of the Cat', example: 'Maine Coon' })
    @Column({ name: 'cat_breed' })
    breed: string
}
