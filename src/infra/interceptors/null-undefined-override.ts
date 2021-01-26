import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

// eslint-disable-next-line consistent-return
function recursivelyStripNullValues(value: unknown): unknown {
    if (Array.isArray(value)) {
        return value.map(recursivelyStripNullValues)
    }

    if (value !== null && typeof value === 'object') {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return Object.fromEntries(
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-shadow
            Object.entries(value).map(([key, value]) => [
                key,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                (value) => value ?? '', // recursivelyStripNullValues(value),
            ),
        )
    }
}
