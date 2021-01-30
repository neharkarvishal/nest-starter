/**
 * User Interface contract
 */
export interface IUser {
    username: string
    email: string
    firstName?: string
    lastName?: string
    isActive: boolean
    password: string
}
