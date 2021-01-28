import {
    applyDecorators,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    HttpStatus,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import {
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiUnauthorizedResponse,
    ApiConflictResponse,
    ApiPropertyOptional,
} from '@nestjs/swagger'

export class ApiException {
    @ApiPropertyOptional() statusCode?: number

    @ApiPropertyOptional() message?: string

    @ApiPropertyOptional() status?: string

    @ApiPropertyOptional() error?: string

    @ApiPropertyOptional() errors?: unknown

    @ApiPropertyOptional() timestamp?: string

    @ApiPropertyOptional() path?: string

    @ApiPropertyOptional() stack?: string

    constructor(
        message: string,
        error: string,
        stack: string,
        errors: unknown,
        path: string,
        statusCode: number,
    ) {
        this.message = message
        this.error = error
        this.stack = stack
        this.errors = errors
        this.path = path
        this.timestamp = new Date().toISOString()
        this.statusCode = statusCode
        this.status = HttpStatus[statusCode]
    }
}

export function ApiErrors() {
    return applyDecorators(
        ApiBadRequestResponse({
            type: BadRequestException,
            description: 'BadRequestException',
        }),
        ApiInternalServerErrorResponse({
            type: InternalServerErrorException,
        }),
        ApiUnauthorizedResponse({
            type: UnauthorizedException,
        }),
        ApiForbiddenResponse({
            type: ForbiddenException,
        }),
        ApiConflictResponse({
            type: ConflictException,
        }),
        ApiNotFoundResponse({ type: NotFoundException, description: 'Not found' }),
    )

    return applyDecorators(
        ApiNotFoundResponse({ type: ApiException, description: 'Not found' }),
        ApiBadRequestResponse({ type: ApiException, description: 'Bad Request' }),
        ApiInternalServerErrorResponse({
            type: ApiException,
            description: 'Internal Server Error',
        }),
        ApiUnauthorizedResponse({
            type: ApiException,
            description: 'Unauthorized',
        }),
        ApiForbiddenResponse({ type: ApiException, description: 'Forbidden' }),
    )
}
