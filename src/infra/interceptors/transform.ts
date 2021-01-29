import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
    data: T
}

/**
 * Transform interceptor is Observer which transform response
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    /**
     * Interceptor Method to implement a custom interceptor.
     *
     * @param context an `ExecutionContext` object providing methods to access the
     * route handler and class about to be invoked.
     * @param next a reference to the `CallHandler`, which provides access to an
     * `Observable` representing the response stream from the route handler.
     */
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        return next.handle().pipe(map((data) => ({ data })))
    }
}
