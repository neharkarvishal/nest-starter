import { ApiPropertyOptional } from '@nestjs/swagger'

import { Transform } from 'class-transformer'
import { IsOptional, Min } from 'class-validator'

export enum OrderType {
    DESC = 'DESC',
    ASC = 'ASC',
}

/**
 * Describes generic pagination params
 */
export abstract class PaginationParams<T> {
    /**
     * Page
     */
    @ApiPropertyOptional({ type: Number, minimum: 0 })
    @IsOptional()
    @Min(0)
    @Transform((val: string) => parseInt(val, 10))
    readonly page // = 0

    /**
     * Page Size
     */
    @ApiPropertyOptional({ type: Number, minimum: 0 })
    @IsOptional()
    @Min(0)
    @Transform((val: string) => parseInt(val, 10))
    readonly pageSize // = 10

    /**
     * OrderBy
     */
    @ApiPropertyOptional()
    @IsOptional()
    abstract readonly order?: { [P in keyof T]?: OrderType }
}

/**
 * Generic pagination response interface
 */
export interface IPagination<T> {
    /**
     * Items included in the current listing
     */
    readonly data: T[]

    /**
     * Paging metadata
     */
    readonly paging: {
        pageSize: number
        page: number
        total: number
        totalPages: number
    }
}
