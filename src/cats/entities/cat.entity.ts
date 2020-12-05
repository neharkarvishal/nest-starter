import { ApiProperty } from '@nestjs/swagger'

import { ICat } from 'src/cats/interfaces/cat.interface'

export class Cat implements ICat {
    /**
     * The name of the Cat
     * @example Kitty
     */
    name: string

    @ApiProperty({ example: 1, description: 'The age of the Cat' })
    age: number

    @ApiProperty({
        example: 'Maine Coon',
        description: 'The breed of the Cat',
    })
    breed: string
}
