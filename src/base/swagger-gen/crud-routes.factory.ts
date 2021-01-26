/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,no-param-reassign,no-nested-ternary,@typescript-eslint/ban-types,@typescript-eslint/restrict-template-expressions */
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { Type } from 'class-transformer'
import * as deepmerge from 'deepmerge'

import {
    ApiProperty,
    BaseRoute,
    isFalse,
    isFunction,
    isObjectFull,
    objKeys,
    swagger,
    swaggerConst,
} from './utils'
import type { CrudOptions, GetManyDefaultResponse, BaseRouteName } from './utils'

export class R {
    static set(
        metadataKey: string,
        metadataValue: any,
        target: Object,
        propertyKey?: string | symbol,
    ) {
        if (!propertyKey) {
            Reflect.defineMetadata(metadataKey, metadataValue, target)
        } else {
            Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey)
        }
    }

    static get<T extends any>(
        metadataKey: any,
        target: Object,
        propertyKey?: string | symbol,
    ): T {
        if (!propertyKey) return Reflect.getMetadata(metadataKey, target)

        return Reflect.getMetadata(metadataKey, target, propertyKey)
    }

    static setRoute(route: BaseRoute, func: Function) {
        R.set('path', route.path, func)
        R.set('method', route.method, func)
    }
}

export class Swagger {
    /**
     * Sets extra swagger metadata for GET Calls
     */
    static setExtraModels(swaggerModels: {
        [x: string]: any
        get: Record<string, unknown>
    }) {
        if (swaggerConst) {
            const meta = Swagger.getExtraModels(swaggerModels.get)
            const models = [
                ...meta,
                ...objKeys(swaggerModels)
                    .map((name) => swaggerModels[name])
                    .filter((one) => one && one.name !== swaggerModels.get.name),
            ]

            R.set(
                swaggerConst.DECORATORS.API_EXTRA_MODELS,
                models,
                swaggerModels.get,
            )
        }
    }

    /**
     * Sets swagger metadata for response of GET Calls
     */
    static setResponseOk(metadata: any[], func: Function) {
        if (swaggerConst) {
            R.set(swaggerConst.DECORATORS.API_RESPONSE, metadata, func)
        }
    }

    static getExtraModels(target: Record<string, unknown>): any[] {
        return swaggerConst
            ? R.get(swaggerConst.API_EXTRA_MODELS, target) || []
            : []
    }

    static getResponseOk(func: Function) {
        return swaggerConst
            ? R.get(swaggerConst.DECORATORS.API_RESPONSE, func) || {}
            : {}
    }

    static createResponseMeta(
        name: BaseRouteName,
        options: CrudOptions,
        swaggerModels: {
            [x: string]: any
            get: { name: any }
            getMany: { name: any }
        },
    ) {
        if (swagger) {
            const { query } = options

            switch (name) {
                case 'getOneBase':
                    return {
                        [HttpStatus.OK]: {
                            description: 'Get one base response',
                            type: swaggerModels.get,
                        },
                    }
                case 'getOne':
                    return {
                        [HttpStatus.OK]: query?.alwaysPaginate
                            ? {
                                  description: 'Get paginated response',
                                  type: swaggerModels.getMany,
                              }
                            : {
                                  description: 'Get many base response',
                                  schema: {
                                      oneOf: [
                                          {
                                              $ref: swagger.getSchemaPath(
                                                  swaggerModels.getMany.name,
                                              ),
                                          },
                                          {
                                              type: 'array',
                                              items: {
                                                  $ref: swagger.getSchemaPath(
                                                      swaggerModels.get.name,
                                                  ),
                                              },
                                          },
                                      ],
                                  },
                              },
                    }
                default:
                    // eslint-disable-next-line no-case-declarations
                    const dto = swaggerModels[name.split('OneBase')[0]]

                    return {
                        [HttpStatus.OK]: {
                            description: 'Response',
                            schema: { $ref: swagger.getSchemaPath(dto.name) },
                        },
                    }
            }
        } else {
            return {}
        }
    }
}

export class SerializeHelper {
    static createGetManyDto(dto: any, resourceName: string): any {
        class GetManyResponseDto implements GetManyDefaultResponse<any> {
            @ApiProperty({ type: dto, isArray: true })
            @Type(() => dto)
            data!: any[]

            @ApiProperty({ type: 'number' })
            count!: number

            @ApiProperty({ type: 'number' })
            total!: number

            @ApiProperty({ type: 'number' })
            page!: number

            @ApiProperty({ type: 'number' })
            pageCount!: number
        }

        Object.defineProperty(GetManyResponseDto, 'name', {
            writable: false,
            value: `GetMany${resourceName}ResponseDto`,
        })

        return GetManyResponseDto
    }

    static createGetOneResponseDto(resourceName: string): any {
        class GetOneResponseDto {}

        Object.defineProperty(GetOneResponseDto, 'name', {
            writable: false,
            value: `${resourceName}ResponseDto`,
        })

        return GetOneResponseDto
    }
}

export class CrudConfigService {
    static config: Partial<CrudOptions> = {
        query: {
            alwaysPaginate: false,
        },
    }

    static load(config: Record<string, unknown>) {
        const query = isObjectFull(config.query) ? config.query : {}
        const params = isObjectFull(config.params) ? config.params : {}
        const serialize = isObjectFull(config.serialize) ? config.serialize : {}

        CrudConfigService.config = deepmerge(
            CrudConfigService.config,
            { query, params, serialize },
            { arrayMerge: (a, b, c) => b },
        )
    }
}

export class CrudRoutesFactory {
    protected options

    protected swaggerModels: any = {}

    constructor(private target: Object, options: CrudOptions) {
        this.options = options
        this.create()

        console.log(
            'CrudRoutesFactory::constructor',
            // { ...options },
            // this.targetProto,
            // this.modelType,
            // this.modelName,
            // this.swaggerModels,
        )
    }

    static create(target: Object, options: CrudOptions): CrudRoutesFactory {
        return new CrudRoutesFactory(target, options)
    }

    get targetProto() {
        // @ts-ignore
        return this.target.prototype
    }

    get modelName() {
        return this.options.model.type?.name
    }

    get modelType() {
        return this.options.model.type
    }

    private create() {
        const routesSchema = CrudRoutesFactory.getRoutesSchema()
        this.mergeOptions()
        this.setResponseModels()
        this.createRoutes(routesSchema)
        this.enableRoutes(routesSchema)
    }

    getOne(name: BaseRouteName) {
        this.targetProto[name] = function getOne(req: any) {
            return this.service.getOne(req)
        }
    }

    getOneBase(name: BaseRouteName) {
        this.targetProto[name] = function getOneBase(req: any) {
            return this.service.getOneBase(req)
        }
    }

    static getRoutesSchema(): BaseRoute[] {
        return [
            {
                name: 'getOneBase',
                path: '/',
                method: RequestMethod.GET,
                enable: false,
                override: false,
                withParams: true,
            },
            {
                name: 'getOne',
                path: '/',
                method: RequestMethod.GET,
                enable: false,
                override: false,
                withParams: false,
            },
        ]
    }

    mergeOptions() {
        // merge query config
        const query = isObjectFull(this.options.query) ? this.options.query : {}
        this.options.query = { ...CrudConfigService.config.query, ...query }

        // set dto
        if (!isObjectFull(this.options.dto)) {
            this.options.dto = {}
        }

        // set serialize
        this.options.serialize = {
            ...CrudConfigService.config.serialize,
            ...this.options.serialize,
        }

        this.options.serialize.get = isFalse(this.options.serialize?.get)
            ? false
            : this.options.serialize?.get || this.modelType

        this.options.serialize.getMany = isFalse(this.options.serialize?.getMany)
            ? false
            : this.options.serialize?.getMany
            ? this.options.serialize?.getMany
            : isFalse(this.options.serialize?.get)
            ? false
            : SerializeHelper.createGetManyDto(
                  this.options.serialize?.get,
                  this.modelName,
              )

        this.options.serialize.create = isFalse(this.options.serialize?.create)
            ? false
            : this.options.serialize?.create || this.modelType

        this.options.serialize.update = isFalse(this.options.serialize?.update)
            ? false
            : this.options.serialize?.update || this.modelType

        this.options.serialize.replace = isFalse(this.options.serialize?.replace)
            ? false
            : this.options.serialize?.replace || this.modelType

        this.options.serialize.delete =
            isFalse(this.options.serialize?.delete) ||
            !this.options.routes?.deleteOneBase?.returnDeleted
                ? false
                : this.options.serialize?.delete || this.modelType

        R.set('CRUD_OPTIONS_METADATA', this.options, this.target)
    }

    setResponseModels() {
        const modelType = isFunction(this.modelType)
            ? this.modelType
            : SerializeHelper.createGetOneResponseDto(this.modelName)

        this.swaggerModels.get = isFunction(this.options.serialize?.get)
            ? this.options.serialize?.get
            : modelType

        this.swaggerModels.getMany =
            this.options.serialize?.getMany ||
            SerializeHelper.createGetManyDto(this.swaggerModels.get, this.modelName)

        this.swaggerModels.create = isFunction(this.options.serialize?.create)
            ? this.options.serialize?.create
            : modelType

        this.swaggerModels.update = isFunction(this.options.serialize?.update)
            ? this.options.serialize?.update
            : modelType

        this.swaggerModels.replace = isFunction(this.options.serialize?.replace)
            ? this.options.serialize?.replace
            : modelType

        this.swaggerModels.delete = isFunction(this.options.serialize?.delete)
            ? this.options.serialize?.delete
            : modelType

        Swagger.setExtraModels(this.swaggerModels)
    }

    enableRoutes(routesSchema: BaseRoute[]) {
        routesSchema.forEach((route) => {
            if (!route.override && route.enable) {
                R.setRoute(route, this.targetProto[route.name])
            }
        })
    }

    createRoutes(routesSchema: BaseRoute[]) {
        routesSchema.forEach((route) => {
            // create base method
            /* this[route.name](route.name) */
            route.enable = true

            // set metadata
            this.setSwaggerResponseOk(route.name)
        })
    }

    setSwaggerResponseOk(name: BaseRouteName) {
        const metadata = Swagger.getResponseOk(this.targetProto[name]) || {}
        const metadataToAdd =
            Swagger.createResponseMeta(name, this.options, this.swaggerModels) || {}

        Swagger.setResponseOk(
            // @ts-ignore
            { ...metadata, ...metadataToAdd },
            this.targetProto[name],
        )
    }
}
