import { ApiProperty } from '@nestjs/swagger'

import { IsInt, IsString } from 'class-validator'
import { ICat } from 'src/cats/interfaces/cat.interface'

export class CreateCatDto implements ICat {
    @ApiProperty({ description: 'The name of the Cat', example: 'Kitty' })
    @IsString()
    readonly name: string

    @ApiProperty({ description: 'The age of the Cat', example: 1 })
    @IsInt()
    readonly age: number

    @ApiProperty({ description: 'The breed of the Cat', example: 'Maine Coon' })
    @IsString()
    readonly breed: string
}
