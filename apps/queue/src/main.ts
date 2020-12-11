/* eslint-disable @typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-call */
import type { INestApplication } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { QueueModule } from 'apps/queue/src/queue.module'

import * as rateLimit from 'express-rate-limit'
import * as helmet from 'helmet'

function createSwagger(app: INestApplication) {
    const SWAGGER_TITLE = 'QUE_API'
    const SWAGGER_DESCRIPTION = 'QUE_API'
    const SWAGGER_PREFIX = '/docs'

    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,@typescript-eslint/no-unsafe-member-access
    const version = (require('../../../package.json').version as string) || '0.0.0'

    const options = new DocumentBuilder()
        .setTitle(SWAGGER_TITLE)
        .setDescription(SWAGGER_DESCRIPTION)
        .setVersion(version)
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup(SWAGGER_PREFIX, app, document)
}

async function setupApp(app: INestApplication) {
    createSwagger(app)

    app.use(helmet())
    app.enableCors()
    app.use(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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

    // ValidationPipe at the application level, thus ensuring all endpoints are protected from receiving incorrect data
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true, // i suppose this creates a white list with properties
            forbidUnknownValues: true, // i dont know why exists
            forbidNonWhitelisted: true, // i suppose this restrict by white list criteria
        }),
    )
    app.enableShutdownHooks()
}

async function bootstrap() {
    const QUEUE_API_DEFAULT_PORT = 4000
    const app = await NestFactory.create(QueueModule, {
        // logger: false,
        cors: true,
    })
    // app.useLogger(app.get(Logger))
    await setupApp(app)
    await app.listen(QUEUE_API_DEFAULT_PORT)

    return app
}

bootstrap()
    .then(({ getUrl }) => getUrl())
    .then((url) => {
        console.log(`Application is running on ${url}`)
    })
    .catch(console.error)
