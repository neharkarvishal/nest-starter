/* eslint-disable @typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return */
import { BadRequestException, NotFoundException } from '@nestjs/common'

import * as bcrypt from 'bcryptjs'
import { of, throwError } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import {
    DeepPartial,
    DeleteResult,
    FindConditions,
    FindManyOptions,
    FindOneOptions,
    Repository,
    UpdateResult,
} from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { BaseEntity } from '../datum/base-entity'
import { ICrudService } from './icrud.service'
import { IPagination } from './pagination'
import { ITryRequest } from './try-request'

export abstract class CrudService<T extends BaseEntity> implements ICrudService<T> {
    saltRounds: number

    protected constructor(protected readonly repository: Repository<T>) {
        this.saltRounds = 12
    }

    async count(filter?: FindManyOptions<T>): Promise<number> {
        return this.repository.count(filter)
    }

    async findAll(filter?: FindManyOptions<T>): Promise<IPagination<T>> {
        const total = await this.repository.count(filter)
        const items = await this.repository.find(filter)

        return { items, total }
    }

    async findOneOrFail(
        id: string | number | FindOneOptions<T> | FindConditions<T>,
        options?: FindOneOptions<T>,
    ): Promise<ITryRequest> {
        try {
            const record = await this.repository.findOneOrFail(id as any, options)

            return { success: true, record }
        } catch (error) {
            return { success: false, error } // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        }
    }

    async findOne(
        id: string | number | FindOneOptions<T> | FindConditions<T>,
        options?: FindOneOptions<T>,
    ): Promise<T> {
        const record = await this.repository.findOne(id as any, options)

        if (!record)
            throw new NotFoundException(`The requested record was not found`)

        return record
    }

    async create(entity: DeepPartial<T>, ...options: any[]): Promise<T> {
        const obj = this.repository.create(entity)

        // READMEWHY: https://github.com/Microsoft/TypeScript/issues/21592
        try {
            return await this.repository.save(obj as any) // eslint-disable-line @typescript-eslint/no-unsafe-return
        } catch (err /*: WriteError */) {
            throw new BadRequestException(err)
        }
    }

    async getPasswordHash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds)
    }

    async update(
        id: string | number | FindConditions<T>,
        partialEntity: QueryDeepPartialEntity<T>,
        ...options: any[]
    ): Promise<UpdateResult | T> {
        try {
            // method getPasswordHash is copied from AuthService
            // try if can import somehow the service and use its method

            // @ts-ignore
            if (partialEntity.hash) {
                // @ts-ignore
                const hashPassword = await this.getPasswordHash(partialEntity.hash)
                // @ts-ignore
                partialEntity.hash = hashPassword // eslint-disable-line no-param-reassign
            }

            return await this.repository.update(id, partialEntity)
        } catch (err /*: WriteError */) {
            throw new BadRequestException(err)
        }
    }

    async delete(
        criteria: string | number | FindConditions<T>,
        ...options: any[]
    ): Promise<DeleteResult> {
        try {
            return await this.repository.delete(criteria)
        } catch (err) {
            throw new NotFoundException(`The record was not found`, err)
        }
    }

    /**
     * e.g., findOneById(id).pipe(map(entity => entity.id), entityNotFound())
     */
    entityNotFound() {
        return (stream$) =>
            stream$.pipe(
                mergeMap((signal) => {
                    if (!signal) {
                        return throwError(
                            new NotFoundException(
                                `The requested record was not found`,
                            ),
                        )
                    }

                    return of(signal)
                }),
            )
    }
}
