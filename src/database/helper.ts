export const accountStatus = [
    'unverified',
    'disabled',
    'banned',
    'verified',
] as const

export const defaultAccountStatus: typeof accountStatus[number] = 'unverified'
