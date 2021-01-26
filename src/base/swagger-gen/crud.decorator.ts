import { CrudRoutesFactory } from './crud-routes.factory'

// eslint-disable-next-line @typescript-eslint/ban-types
export const Crud = (options: any) => (target: Object) => {
    let factory = CrudRoutesFactory.create(target, options)
    // @ts-ignore
    factory = undefined
}
