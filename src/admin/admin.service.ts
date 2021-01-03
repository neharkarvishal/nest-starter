import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CrudService } from '../base/crud'
import { Admin } from './datum/admin.entity'
import { AdminRepository } from './datum/admin.repository'

@Injectable()
export class AdminService extends CrudService<Admin> {
    constructor(@InjectRepository(AdminRepository) public repo: AdminRepository) {
        super(repo)
    }

    async getUserByEmail(email: string): Promise<Admin> {
        return this.repo
            .createQueryBuilder('a')
            .where('a.email = :email', { email })
            .getOneOrFail()
    }

    /**
     * Deletes all of the Cat records form database
     */
    async clear() {
        return this.repo.clearAll()
    }
}
