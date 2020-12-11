import { IRole } from './role.model'

export interface IUser {
    name?: string
    firstName?: string
    lastName?: string
    email?: string
    username?: string
    role?: IRole
    roleId?: string
    hash?: string
    imageUrl?: string
    fullName?: string
}

export interface IUserFindInput {
    thirdPartyId?: string
    firstName?: string
    lastName?: string
    email?: string
    username?: string
    role?: IRole
    roleId?: string
    hash?: string
    imageUrl?: string
}

export interface IUserRegistrationInput {
    user: IUser
    password?: string
    originalUrl?: string
    organizationId?: string
    createdById?: string
}

export interface IAuthLoginInput {
    findObj: {
        email: string
    }
    password: string
}
export interface IAuthResponse {
    user: IUser
    token: string
}
export interface IUserCreateInput {
    firstName?: string
    lastName?: string
    email?: string
    username?: string
    role?: IRole
    roleId?: string
    hash?: string
    imageUrl?: string
}

export interface IUserUpdateInput {
    firstName?: string
    lastName?: string
    email?: string
    username?: string
    role?: IRole
    roleId?: string
    hash?: string
    imageUrl?: string
}

export enum LanguagesEnum {
    ENGLISH = 'en',
}

export enum ProviderEnum {
    GOOGLE = 'google',
    FACEBOOK = 'facebook',
}
