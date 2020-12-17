import { EntityRepository, getManager, Repository } from 'typeorm'

import { User } from './user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    /**
     * Deletes all of the User records form database
     */
    async clearAll() {
        let cleared = {}
        cleared = await getManager().query('DELETE FROM users') // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        return cleared
    }
}
