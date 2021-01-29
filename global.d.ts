interface EnvironmentVariables {
    NODE_ENV: string
    PORT: string

    JWTKEY: string
    TOKEN_EXPIRATION: string

    DATABASE_URL: string
    DATABASE_DEBUG: string
}

declare namespace Express {
    interface Request {
        user: Record<string, unknown>
    }
}
