import { GetManyDefaultResponse } from '@nestjsx/crud/lib/interfaces/get-many-default-response.interface'

export class GetManyDto<T> implements GetManyDefaultResponse<T> {
    count: number

    data: T[]

    page: number

    pageCount: number

    total: number
}
