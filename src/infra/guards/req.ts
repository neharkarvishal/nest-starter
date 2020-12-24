/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'

import { Observable } from 'rxjs'

@Injectable()
export class RequestGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        this.bindRequestHelpers(context.switchToHttp().getRequest())

        return true
    }

    /**
     * Bind Request Helpers
     *
     * @param request
     */
    bindRequestHelpers(request: any): any {
        function all(): Record<string, any> {
            const inputs = { ...request.query, ...request.body, ...request.params }

            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const key in inputs) {
                const value = inputs[key]
                if (typeof value === 'string' || value instanceof String) {
                    inputs[key] = value.trim()
                }
            }

            return inputs
        }

        request.all = all
        return request
    }
}
