/* eslint-disable @typescript-eslint/ban-types */
import { ValidationPipeOptions } from '@nestjs/common'
import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type'

export declare type BaseRouteName =
    | 'getManyBase'
    | 'getOneBase'
    | 'createOneBase'
    | 'createManyBase'
    | 'updateOneBase'
    | 'replaceOneBase'
    | 'deleteOneBase'

export interface GetManyDefaultResponse<T> {
    data: T[]
    count: number
    total: number
    page: number
    pageCount: number
}

export interface ParamOption {
    field?: string
    type?: 'number' | 'string' | 'uuid'
    enum?: SwaggerEnumType
    primary?: boolean
    disabled?: boolean
}

export interface ParamsOptions {
    [key: string]: ParamOption
}

export interface CrudOptions {
    model: {}
    dto?: {}
    routes?: {}
    validation?: ValidationPipeOptions | false
    params?: ParamsOptions
    query?: {
        limit?: number
        maxLimit?: number
        cache?: number | false
        alwaysPaginate?: boolean
    }
    serialize?: {
        getMany?: false
        get?: false
        create?: false
        createMany?: false
        update?: false
        replace?: false
        delete?: false
    }
}

export function safeRequire<T = any>(path: string): T | null {
    try {
        // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires,import/no-dynamic-require
        const pack = require(path)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return pack
    } catch (_) {
        return null
    }
}

export const swagger = safeRequire('@nestjs/swagger')
export const swaggerConst = safeRequire('@nestjs/swagger/dist/constants')

export function ApiProperty(options?: any): PropertyDecorator {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (target: object, propertyKey: string | symbol) => {
        if (swagger) {
            const ApiPropertyDecorator =
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                swagger.ApiProperty || swagger.ApiModelProperty
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            ApiPropertyDecorator(options)(target, propertyKey)
        }
    }
}
