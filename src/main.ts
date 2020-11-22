import { ValidationPipe } from '@nestjs/common'
import type { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as rateLimit from 'express-rate-limit'
import * as helmet from 'helmet'

import { AppModule } from './app.module'

function createSwagger(app: INestApplication) {
    const SWAGGER_TITLE = 'API'
    const SWAGGER_DESCRIPTION = 'API'
    const SWAGGER_PREFIX = '/docs'

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-var-requires,global-require
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

    const app = await NestFactory.create(AppModule)
    createSwagger(app)

    app.use(helmet()) // eslint-disable-line @typescript-eslint/no-unsafe-call
    app.enableCors()
    app.use(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
        }),
    )

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    app.disable('ETag') // eslint-disable-line @typescript-eslint/no-unsafe-call

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    app.disable('X-Powered-By') // eslint-disable-line @typescript-eslint/no-unsafe-call

    app.useGlobalPipes(new ValidationPipe())
    app.enableShutdownHooks()

    await app.listen(API_DEFAULT_PORT)

    return app
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
    .then(({ getUrl }) => getUrl())
    .then((url) => {
        // eslint-disable-next-line no-console
        console.log(`Application is running on ${url}`)
    })
