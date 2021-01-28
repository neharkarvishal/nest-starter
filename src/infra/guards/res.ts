/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'

import { Observable } from 'rxjs'

/**
 * Response Guard
 */
@Injectable()
export class ResponseGuard implements CanActivate {
    /**
     * Guard Method
     *
     * @param context Current execution context. Provides access to details about
     * the current request pipeline.
     *
     * @returns Value indicating whether or not the current request is allowed to
     * proceed.
     */
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        this.bindResponseHelpers(context.switchToHttp().getResponse())

        return true
    }

    /**
     * Bind Response Helpers
     *
     * @param response
     */
    bindResponseHelpers(response: any): any {
        function success(
            data: Record<string, any> | Array<any> | string,
            status = 200,
        ) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            return response.status(status).json({
                success: true,
                code: status,
                data,
            })
        }

        // eslint-disable-next-line @typescript-eslint/no-shadow
        function error(error: Record<string, any> | string, status = 401) {
            let message = 'Something went wrong!'
            let errors = null
            if (error instanceof Object) {
                message = error.message
                errors = error.errors
            } else {
                message = error
            }

            return response.status(status).json({
                success: false,
                code: status,
                message,
                errors,
            })
        }

        function noContent() {
            return response.status(204).end()
        }

        function withMeta(data: Record<string, any>, status = 200) {
            const { data: dataObj, ...meta } = data

            return response.status(status).json({
                success: true,
                code: status,
                data: dataObj,
                meta,
            })
        }

        response.error = error
        response.success = success
        response.withMeta = withMeta
        response.noContent = noContent

        return response
    }
}
