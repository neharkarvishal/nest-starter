/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityRepository, getManager, Repository } from 'typeorm'

import { User } from './user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    /**
     * Get the User of provided cat id
     */
    async getUserByCatId(catId) {
        return this.createQueryBuilder('u')
            .innerJoinAndMapMany('u.cats', 'u.cats', 'cats', 'cats.userId = u.Id')
            .getOneOrFail()
    }

    /**
     * Get the User of provided email
     */
    async getUserByEmail(email: string) {
        return this.createQueryBuilder('a')
            .where('a.email = :email', { email })
            .getOneOrFail()
    }

    /**
     * Deletes all of the User records form database
     */
    async clearAll() {
        let cleared = {}
        cleared = await getManager().query('DELETE FROM users') // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        return cleared
    }
}
