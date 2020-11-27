/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/ban-ts-comment,@typescript-eslint/no-floating-promises,no-console */
import { ValidationPipe } from '@nestjs/common'
import type { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { Logger } from 'nestjs-pino'

import * as rateLimit from 'express-rate-limit'
import * as helmet from 'helmet'

import { AppModule } from './app/app.module'

function createSwagger(app: INestApplication) {
    const SWAGGER_TITLE = 'API'
    const SWAGGER_DESCRIPTION = 'API'
    const SWAGGER_PREFIX = '/docs'

    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,@typescript-eslint/no-unsafe-member-access
    const version = (require('../package.json').version as string) || ''

    const options = new DocumentBuilder()
        .setTitle(SWAGGER_TITLE)
        .setDescription(SWAGGER_DESCRIPTION)
        .setVersion(version)
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup(SWAGGER_PREFIX, app, document)
}

async function bootstrap() {
    const API_DEFAULT_PORT = 3000

    const app = await NestFactory.create(AppModule, { logger: false })
    app.useLogger(app.get(Logger))

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

    app.useGlobalPipes(new ValidationPipe())
    app.enableShutdownHooks()

    await app.listen(API_DEFAULT_PORT)

    return app
}

bootstrap()
    .then(({ getUrl }) => getUrl())
    .then((url) => {
        console.log(`Application is running on ${url}`)
    })
    .catch(console.error)
