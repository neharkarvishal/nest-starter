export const mockedJwtService = {
    sign: () => '',
    signAsync: async () => Promise.resolve(''),
}

export const mockedConfigService = {
    get(key: string) {
        switch (key) {
            case 'JWT_ACCESS_TOKEN_EXPIRATION_TIME':
                return '3600'
            default:
                return ''
        }
    },
}
