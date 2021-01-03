import { EntityRepository, getManager, Repository } from 'typeorm'

import { Admin } from './admin.entity'

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
    /**
     * Deletes all of the Admin records form database
     */
    async clearAll(force = false) {
        if (!force) return Promise.reject()

        let cleared = {}
        cleared = await getManager().query('DELETE FROM admins') // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        return cleared
    }
}
