interface EnvironmentVariables {
    NODE_ENV: string
    PORT: string
    HOST: string

    JWTKEY: string
    TOKEN_EXPIRATION: string

    DATABASE_URL: string
    DATABASE_DEBUG: string

    GOOGLE_SECRET: string
    GOOGLE_CLIENT_ID: string
}

declare namespace Express {
    interface Request {
        user: Record<string, unknown>
    }
}
