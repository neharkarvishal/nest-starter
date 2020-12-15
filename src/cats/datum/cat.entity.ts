import { ApiProperty } from '@nestjs/swagger'

import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm'

@Entity({ name: 'cats' })
export class Cat {
    public static readonly NAME_LENGTH = 36

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
}
