/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unused-vars */
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common'

import { QueryFailedError } from 'typeorm'
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'

@Catch(QueryFailedError, EntityNotFoundError)
export class QueryFailedFilter implements ExceptionFilter {
    catch(exception: QueryFailedError | EntityNotFoundError, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = HttpStatus.PRECONDITION_FAILED

        // @ts-ignore
        const { message, errno, code, name, query, parameters } = exception

        // @ts-ignore
        response.status(status).json({
            code,
            errno,
            message,
            statusCode: status,

            path: request.url,
            // timestamp: new Date().toISOString(),
        })
    }
}
