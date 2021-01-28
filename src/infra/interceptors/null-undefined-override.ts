import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

/**
 * Recursively Strip Null Values
 */
function recursivelyStripNullValues(value: unknown): unknown {
    if (Array.isArray(value)) {
        return value.map(recursivelyStripNullValues)
    }

    if (value !== null && typeof value === 'object') {
        // @ts-ignore
        return Object.fromEntries(
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-shadow
            Object.entries(value).map(([key, value]) => [
                key,
                recursivelyStripNullValues(value),
            ]),
        )
    }

    if (value !== null) {
        return value
    }

    return ''
}

/**
 * Interceptors to transform each occurrence of a null value to an empty string ''
 */
@Injectable()
export class ExcludeNullUndefinedInterceptor implements NestInterceptor {
    /**
     * Interceptor Method to implement a custom interceptor.
     *
     * @param context an `ExecutionContext` object providing methods to access the
     * route handler and class about to be invoked.
     * @param next a reference to the `CallHandler`, which provides access to an
     * `Observable` representing the response stream from the route handler.
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(
                (value) => value ?? '', // recursivelyStripNullValues(value),
            ),
        )
    }
}
