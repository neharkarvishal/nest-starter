import { BaseModel } from './base.model'

export class Theme extends BaseModel {
    static tableName = 'themes'

    name: string

    fontFamily: string

    fontSize: number

    background: string

    foreground: string
}
