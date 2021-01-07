import { BaseModel } from './base.model'

export class Tag extends BaseModel {
    static tableName = 'tags'

    name: string
}
