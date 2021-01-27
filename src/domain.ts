/* eslint-disable no-use-before-define,@typescript-eslint/no-empty-interface */
import { HttpStatus } from '@nestjs/common'

export type Results =
    | GetAppLaunchData
    | GetUserProfile
    | GetUserPosts
    | GetComments
    | GetRescueList
    | GetFollowers
    | GetFollowing

export type APIError = Error | string | null

export interface Result<T> {
    data: T
    error?: APIError
    message?: string | string[]
    statusCode: HttpStatus
}

export interface APIResponse<T> {
    data: T
    error?: APIError
    message?: string | string[]
    statusCode: HttpStatus

    count?: number
    page?: number
    pageCount?: number
    total?: number
}

export interface GetAppLaunchData {
    link: 'api:/'
    response: APIResponse<AppLaunchAction[]>
}

export interface GetUserProfile {
    link: 'api:v1/user/getUserProfile?userId=25'
    response: APIResponse<User>
}

export interface GetUserPosts {
    link: 'api:v1/user/getUserPosts?pageNo=0&pageSize=25'
    response: APIResponse<UserPosts>
}

export interface GetRescueList {
    link: 'api:v1/rescue/getRescueList?pageNo=0&pageSize=10&status=pending|inProgress|completed|nearest'
    response: APIResponse<RescueLists>
}

export interface GetComments {
    link: 'api:v1/rescue/getComments?pageNo=0&pageSize=10&postId=1230'
    response: APIResponse<Comments>
}

export interface GetFollowers {
    link: 'api:v1/rescue/getUserFollowers?userId=1230'
    response: APIResponse<Follower[]>
}

export interface GetFollowing {
    link: 'api:v1/rescue/getUserFollowing?userId=1230'
    response: APIResponse<Following[]>
}

export interface AppLaunchAction {
    actionId: number
    action: string
    isActive: boolean
    subject?: string
}

export interface User {
    usesId: number

    coverImage: string
    following: boolean
    gender: string
    isOwnProfile: number
    isRescuer: boolean
    latitude: number
    longitude: number
    numberOfFollowers: number
    numberOfFollowing: number
    numberOfPosts: number
    numberOfRescuesCompleted: number
    numberOfRescuesCreated: number
    numberOfRescuesInProgress: number
    profileImage: string
    rescuer: boolean
    userAddress: string
    userContacts: string
    userEmail: string
    userName: string
    badge: {
        badgeId: number
        badgeName: string
        badgeDescription: string
        recuesCompletionNeeded: number
    }
    setting: {
        showMyContacts: boolean
        getNotifications: boolean
    }
}

export interface PostType {
    postTypeId: number
    postType: string
}

export interface PostedByUser {
    usesId: number
    badgeName: string
    following: boolean
    profileImage: string
    rescuer: boolean
    userName: string
}

export interface UserPost {
    postId: number
    commentsCount: number
    isUserReactedToPost: boolean
    ownPage: boolean
    postBy: PostedByUser
    postImage: string
    postTime: string
    postType: PostType
    postVideo: string
    reactionsCount: number
    timeAgo: string

    adCorporateLogoUrl: string | null
    corporateDescription: string | null
    corporateName: string | null
}

export interface UserPosts {
    isRecent: boolean
    feed: UserPost[]
}

export interface Rescues {
    rescueId: number
    animalImageUrl: string
    distance: number
    distanceAway: string
    emergencyType: string
    postedBy: string
    postedMinAgo: string
    rescueDate: Date
    rescuedPetName: string
    rescueLocality: string
    rescuers: {
        contact: number
        name: string
        profileId: number
        profileImageUrl: string
        rescues: boolean
        showMyNumber: boolean
    }
    rescueStatus: string
    viewsCont: number
}

export interface RescueLists {
    rescues: Rescues[]
}

export interface Comment {
    commentId: number
    comment: string
    commentedUseName: string
    commentedUserId: number
    timeAgo: string
}

export interface Comments {
    comments: Comment[]
}

export interface Follower {
    userId: number
    userName: string
    profileImage: string
    areYouFollowing: boolean
    showRemoveOption: boolean
}

export interface Following extends Follower {}
