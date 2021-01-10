/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unused-vars */
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common'

// eslint-disable-next-line import/no-extraneous-dependencies
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
)
export class QueryFailedFilter implements ExceptionFilter {
    catch(
        exception:
            | CheckViolationError
            | ConstraintViolationError
            | DataError
            | ForeignKeyViolationError
            | NotNullViolationError
            | UniqueViolationError,
        host: ArgumentsHost,
    ) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = HttpStatus.PRECONDITION_FAILED

        const {
            message,
            nativeError,
            name, // @ts-ignore
            table, // @ts-ignore
            column, // @ts-ignore
            columns, // @ts-ignore
            database, // @ts-ignore
            constraint, // @ts-ignore
            schema,
        } = exception

        // @ts-ignore
        response.status(status).json({
            statusCode: status,
            message,
            nativeError,
            name,
            table,
            columns: column ? [column] : columns,
            database,
            constraint,
            schema,

            path: request.url,
            // timestamp: new Date().toISOString(),
        })
    }
}
