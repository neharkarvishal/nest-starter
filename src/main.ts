/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unused-vars */
import 'source-map-support/register'

import { ValidationPipe } from '@nestjs/common'
import type { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, HttpAdapterHost } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import * as rateLimit from 'express-rate-limit'
import * as helmet from 'helmet'

import { AppModule } from './app.module'
import { QueryFailedFilter } from './infra/filters/query-failed.filter'
import { ValidationFailedFilter } from './infra/filters/validation-failed.filter'
import { RequestGuard } from './infra/guards/req'
import { ResponseGuard } from './infra/guards/res'
import { ExcludeNullUndefinedInterceptor } from './infra/interceptors/null-undefined-override'
import { TimeoutInterceptor } from './infra/interceptors/timeout'
import { TransformInterceptor } from './infra/interceptors/transform'

function setupSwaggerDocs(app: INestApplication) {
    const version = (require('../../package.json').version as string) || '' // eslint-disable-line @typescript-eslint/no-var-requires,global-require,@typescript-eslint/no-unsafe-member-access

    const config = new DocumentBuilder()
        .setTitle('API')
        .setDescription('API')
        .setVersion(version)
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, config, {
        deepScanRoutes: true,
    })

    SwaggerModule.setup('/docs', app, document)
}

function setupInfra(app: INestApplication) {
    // pipes
    /**
     * ValidationPipe at the application level, thus ensuring all endpoints are protected from receiving incorrect data
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

    // interceptors
    // app.useGlobalInterceptors(new TransformInterceptor())
    app.useGlobalInterceptors(new TimeoutInterceptor())
    app.useGlobalInterceptors(new ExcludeNullUndefinedInterceptor())

    // filters
    // const { httpAdapter } = app.get(HttpAdapterHost)
    app.useGlobalFilters(new QueryFailedFilter())
    app.useGlobalFilters(new ValidationFailedFilter())

    // guards (express specific)
    // app.useGlobalGuards(new ResponseGuard())
    app.useGlobalGuards(new RequestGuard())
}

function setupMiddlewares(app: INestApplication) {
    // middlewares (express specific)
    // app.use(helmet({ contentSecurityPolicy: false }))
    app.enableCors({ origin: '*' })

    // limit for all paths
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 500, // limit each IP to 500 requests per windowMs
            message: 'Too many requests from this IP, please try again later',
        }),
    )

    // signup limiter
    app.use(
        '/auth/signup',
        rateLimit({
            windowMs: 60 * 60 * 1000, // 1 hour window
            max: 10, // start blocking after 10 requests
            message:
                'Too many signup request from this IP, please try again after an hour',
        }),
    )

    // @ts-ignore
    app.disable('ETag')
    // @ts-ignore
    app.disable('X-Powered-By')

    app.enableShutdownHooks()
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true })
    app.setGlobalPrefix('api')
    const config: ConfigService<EnvironmentVariables> = app.get(ConfigService)

    setupSwaggerDocs(app)
    setupInfra(app)
    setupMiddlewares(app)

    await app.listen(+config.get('PORT') || 3000)

    return app
}

bootstrap()
    .then(({ getUrl }) => getUrl())
    .then((url) => {
        console.log(`Application is running on ${url}`) // eslint-disable-line no-console
    })
    .catch(console.error)
