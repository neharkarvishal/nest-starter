/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ValidationPipe } from '@nestjs/common'
import type { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from 'src/app.module'

import * as rateLimit from 'express-rate-limit'
import * as helmet from 'helmet'

function createSwagger(app: INestApplication) {
    const SWAGGER_TITLE = 'API'
    const SWAGGER_DESCRIPTION = 'API'
    const SWAGGER_PREFIX = '/docs'

    const version = (require('../package.json').version as string) || '' // eslint-disable-line @typescript-eslint/no-var-requires,global-require,@typescript-eslint/no-unsafe-member-access

    const options = new DocumentBuilder()
        .setTitle(SWAGGER_TITLE)
        .setDescription(SWAGGER_DESCRIPTION)
        .setVersion(version)
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup(SWAGGER_PREFIX, app, document)
}

async function setupApp(app: INestApplication, API_DEFAULT_PORT: number) {
    createSwagger(app)

    app.use(helmet())
    app.enableCors()
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
            message: 'Too many requests from this IP, please try again later',
        }),
    )

    // @ts-ignore
    app.disable('ETag')

    // @ts-ignore
    app.disable('X-Powered-By')

    /**
     * ValidationPipe at the application level, thus ensuring all endpoints are
     * protected from receiving incorrect data
     */
    app.useGlobalPipes(
        new ValidationPipe({
            disableErrorMessages: false,
            transform: true,
            whitelist: true, // i suppose this creates a white list with properties
            forbidUnknownValues: true, // i dont know why exists
            forbidNonWhitelisted: true, // i suppose this restrict by white list criteria
        }),
    )
    app.enableShutdownHooks()

    await app.listen(API_DEFAULT_PORT)
}

async function bootstrap() {
    const API_DEFAULT_PORT = 3000
    const app = await NestFactory.create(AppModule, { cors: true })
    await setupApp(app, +process.env.PORT || API_DEFAULT_PORT)
    return app
}

bootstrap()
    .then(({ getUrl }) => getUrl())
    .then((url) => {
        console.log(`Application is running on ${url}`) // eslint-disable-line no-console
    })
    .catch(console.error)
