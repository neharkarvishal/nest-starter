import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'

import { NotFoundError } from 'objection'
import {
    UniqueViolationError,
    NotNullViolationError,
    ForeignKeyViolationError,
    ConstraintViolationError,
    CheckViolationError,
    DataError,
} from 'objection-db-errors'

@Catch(
    CheckViolationError,
    ConstraintViolationError,
    DataError,
    ForeignKeyViolationError,
    NotNullViolationError,
    UniqueViolationError,
    NotFoundError,
)
export class QueryFailedFilter implements ExceptionFilter {
    catch(
        exception:
            | CheckViolationError
            | ConstraintViolationError
            | DataError
            | ForeignKeyViolationError
            | NotNullViolationError
            | UniqueViolationError
            | NotFoundError,
        host: ArgumentsHost,
    ) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = HttpStatus.PRECONDITION_FAILED

        const {
            name, // @ts-ignore
            data, // @ts-ignore
            type, // @ts-ignore
            table, // @ts-ignore
            column, // @ts-ignore
            schema, // @ts-ignore
            message, // @ts-ignore
            columns, // @ts-ignore
            database, // @ts-ignore
            constraint, // @ts-ignore
            nativeError, // @ts-ignore
        } = exception

        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        response.status(status).json({
            statusCode: status,
            message,

            name,
            table,
            schema,
            database,
            constraint,
            nativeError,
            columns: column ? [column] : columns,

            data,
            type,

            path: request.url,
            // timestamp: new Date().toISOString(),
        })
    }
}
