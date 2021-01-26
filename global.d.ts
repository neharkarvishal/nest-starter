interface EnvironmentVariables {
    NODE_ENV: string
    PORT: string

    JWTKEY: string
    TOKEN_EXPIRATION: string

    database: string
    type: string
    logging: string
    synchronize: string
}

declare namespace Express {
    interface Request {
        user: Record<string, unknown>
    }
}
