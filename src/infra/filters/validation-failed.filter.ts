import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'

import { ValidationError } from 'objection'

/**
 * Validation Failed Exception Filter
 */
@Catch(ValidationError)
export class ValidationFailedFilter implements ExceptionFilter {
    /**
     * Method to implement a custom exception filter.
     *
     * @param exception the class of the exception being handled
     * @param host used to access an array of arguments for
     * the in-flight request
     */
    catch(exception: ValidationError, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = HttpStatus.PRECONDITION_FAILED

        const {
            statusCode: validationErrorCode,
            message,
            data, // ErrorHash?
            type, // ValidationErrorType
        } = exception

        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        response.status(status).json({
            data,
            type,
            message,
            validationErrorCode,

            statusCode: status,

            path: request.url,
            timestamp: new Date().toISOString(),
        })
    }
}
