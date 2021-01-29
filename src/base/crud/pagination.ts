import { HttpStatus } from '@nestjs/common'
import { ApiPropertyOptional } from '@nestjs/swagger'

import { Transform } from 'class-transformer'
import { IsOptional, Min } from 'class-validator'

import { APIError } from '../../domain'

export enum OrderType {
    DESC = 'DESC',
    ASC = 'ASC',
}

/**
 * Describes generic pagination params
 */
export abstract class PaginationParams<T> {
    /**
     * page
     */
    @ApiPropertyOptional({ type: Number, minimum: 0 })
    @IsOptional()
    @Min(0)
    @Transform((val: string) => parseInt(val, 10))
    readonly page?: number // = 0

    /**
     * page size
     */
    @ApiPropertyOptional({ type: Number, minimum: 0 })
    @IsOptional()
    @Min(0)
    @Transform((val: string) => parseInt(val, 10))
    readonly pageSize?: number // = 10

    /**
     * order
     */
    @ApiPropertyOptional()
    @IsOptional()
    abstract readonly order?: { [P in keyof T]?: OrderType }
}

/**
 * Generic pagination response interface
 */
export interface IPaginationResult<T> {
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

    /**
     * Error if any
     */ error?: APIError

    /**
     * Message if anu
     */
    message?: string | string[]

    /**
     * Http status code
     */
    statusCode: HttpStatus
}
