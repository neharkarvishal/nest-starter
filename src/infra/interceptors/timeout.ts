import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    RequestTimeoutException,
} from '@nestjs/common'

import { Observable, throwError, TimeoutError } from 'rxjs'
import { catchError, timeout } from 'rxjs/operators'

/**
 * Timeout interceptor is Observer which terminate request if it takes more than timeout value
 */
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
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
            timeout(10000), // end request after 10_000 milliseconds

            catchError((e) => {
                if (e instanceof TimeoutError) {
                    return throwError(new RequestTimeoutException())
                }

                return throwError(e)
            }),
        )
    }
}
