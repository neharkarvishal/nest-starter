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
