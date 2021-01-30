import { Inject } from '@nestjs/common'

import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator'
import { ModelClass } from 'objection'

import { User } from '../../users/user.model'

@ValidatorConstraint({ async: false })
export class IsEmailExistsConstraint implements ValidatorConstraintInterface {
    constructor(@Inject(User.name) readonly user: ModelClass<User>) {}

    async validate(email: string) {
        const user = await this.user.query().findOne({ email })

        return !user
    }
}

export const IsEmailExists = (validationOptions?: ValidationOptions) => {
    return (object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            options: validationOptions,
            constraints: [],
            propertyName,
            validator: IsEmailExistsConstraint,
        })
    }
}
