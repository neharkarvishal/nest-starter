/* eslint-disable @typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return */
import { BadRequestException, NotFoundException } from '@nestjs/common'

import * as bcrypt from 'bcryptjs'
import { ModelClass, Page } from 'objection'
import { of, throwError } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import {
    DeepPartial,
    FindConditions,
    FindManyOptions,
    FindOneOptions,
    Repository,
} from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { BaseModel } from '../../database/models/base.model'
import { ICrudService } from './icrud.service'
import { IPagination } from './pagination'

export abstract class CrudService<T extends BaseModel> implements ICrudService<T> {
    saltRounds: number

    protected constructor(protected readonly model: ModelClass<T>) {
        this.saltRounds = 12
    }

    async findAll(filter) {
        return (this.model.query().page(0, 1) as unknown) as Promise<Page<T>>
    }

    async findOne(id: string | number): Promise<T> {
        return (this.model
            .query()
            .findById(id)
            .first()
            .throwIfNotFound() as unknown) as Promise<T>
    }
}
