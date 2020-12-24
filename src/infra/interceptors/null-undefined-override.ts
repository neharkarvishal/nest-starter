import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

/**
 * Interceptors to transform each occurrence of a null value to an empty string ''
 */
@Injectable()
export class ExcludeNullUndefinedInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                (value) => value ?? '',
            ),
        )
    }
}
