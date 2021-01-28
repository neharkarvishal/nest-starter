/* eslint-disable @typescript-eslint/ban-types */
import { RequestMethod, ValidationPipeOptions } from '@nestjs/common'
import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type'

export declare type BaseRouteName =
    | 'getManyBase'
    | 'getOneBase'
    | 'createOneBase'
    | 'createManyBase'
    | 'updateOneBase'
    | 'replaceOneBase'
    | 'deleteOneBase'
    | 'getOne'

export interface BaseRoute {
    name: BaseRouteName
    path: string
    method: RequestMethod
    enable: boolean
    override: boolean
    withParams: boolean
}

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
    model: {
        type: { name: string }
    }
    dto?: {}
    routes?: {
        deleteOneBase?: { returnDeleted?: boolean }
    }
    validation?: ValidationPipeOptions | false
    params?: ParamsOptions
    query?: {
        limit?: number
        maxLimit?: number
        cache?: number | false
        alwaysPaginate?: boolean
    }
    serialize?: {
        getMany?: false | object
        get?: false | object
        create?: false | object
        createMany?: false | object
        update?: false | object
        replace?: false | object
        delete?: false | object
    }
}

export function safeRequire<T = any>(path: string): T | null {
    try {
        // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires,import/no-dynamic-require
        const pack = require(path)
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
                swagger.ApiProperty || swagger.ApiModelProperty
            ApiPropertyDecorator(options)(target, propertyKey)
        }
    }
}
