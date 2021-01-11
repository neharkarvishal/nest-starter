import { cloneDeep } from 'lodash'
import { Model, Page, QueryBuilder } from 'objection'

/**
 * Check if value is of type object.
 *
 * @param value
 */
export function isObject(value: any): boolean {
    return typeof value === 'object' && value !== null
}

/**
 * Check if value is empty
 *
 * @param value
 */
export function isEmpty(value: any): boolean {
    if (Array.isArray(value) && value.length < 1) return true
    if (isObject(value) && Object.keys(value).length < 1) return true
    return !value
}

/**
 * Check if value is not empty
 *
 * @param value
 */
export function isNotEmpty(value: any): boolean {
    return !isEmpty(value)
}

export class CustomQueryBuilder<M extends Model, R = M[]> extends QueryBuilder<
    M,
    R
> {
    ArrayQueryBuilderType!: CustomQueryBuilder<M, M[]>

    SingleQueryBuilderType!: CustomQueryBuilder<M, M>

    NumberQueryBuilderType!: CustomQueryBuilder<M, number>

    PageQueryBuilderType!: CustomQueryBuilder<M, Page<M>>

    async paginate(page: number, perPage: number) {
        page = +page ? +page : 1 // eslint-disable-line no-param-reassign
        perPage = +perPage ? +perPage : 15 // eslint-disable-line no-param-reassign

        const result = await this.page(page - 1, perPage)
        return {
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(result.total / perPage),
                perPage,
                total: result.total,
            },
            data: result.results,
        }
    }

    async onlyCount() {
        const result = await this.count({ c: '*' })
        return result[0].c // eslint-disable-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    }

    async exists() {
        return !!(await this.onlyCount())
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    async chunk(cb: Function, size: number): Promise<void> {
        let offset = 0
        let hasMore = true

        while (!offset || hasMore) {
            const query = cloneDeep(this) // eslint-disable-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
            const records = await query.offset(offset).limit(size) // eslint-disable-line @typescript-eslint/no-unsafe-call,no-await-in-loop,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment

            hasMore = isNotEmpty(records)

            if (!hasMore) return

            await cb(records) // eslint-disable-line no-await-in-loop

            offset += size
        }
    }
}
