import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'cats' })
export class Cat {
    public static readonly NAME_LENGTH = 36

    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'cat_name', length: Cat.NAME_LENGTH })
    name: string

    @Column({ name: 'cat_age' })
    age: number

    @Column({ name: 'cat_breed' })
    breed: string
}
