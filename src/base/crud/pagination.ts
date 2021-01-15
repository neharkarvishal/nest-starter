/**
 * Generic pagination interface
 */
export interface IPagination<T> {
    /**
     * Items included in the current listing
     */
    readonly results: T[]

    /**
     * Total number of available items
     */
    readonly total: number
}
