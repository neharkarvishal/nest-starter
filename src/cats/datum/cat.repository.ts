import { EntityRepository, getManager, Repository } from 'typeorm'

import { Cat } from './cat.entity'

@EntityRepository(Cat)
export class CatRepository extends Repository<Cat> {
    /**
     * Deletes all of the Cat records form database
     */
    async clearAll() {
        let cleared = {}
        cleared = await getManager().query('DELETE FROM cats') // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        return cleared
    }
}
