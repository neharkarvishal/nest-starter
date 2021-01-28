import './miscSetup'

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import type { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, HttpAdapterHost, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

// import { SpelunkerModule } from 'nestjs-spelunker'

// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import * as blockedAt from 'blocked-at'
import * as cluster from 'cluster'
// @ts-ignore
import * as rateLimit from 'express-rate-limit'
import * as helmet from 'helmet'
import * as os from 'os'

import { AppModule } from './app.module'
import { QueryFailedFilter } from './infra/filters/query-failed.filter'
import { ValidationFailedFilter } from './infra/filters/validation-failed.filter'
import { RequestGuard } from './infra/guards/req'
import { ResponseGuard } from './infra/guards/res'
import { ExcludeNullUndefinedInterceptor } from './infra/interceptors/null-undefined-override'
import { TimeoutInterceptor } from './infra/interceptors/timeout'
import { TransformInterceptor } from './infra/interceptors/transform'

function setupSwaggerDocs(app: INestApplication) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const version = (require('../../package.json').version as string) || ''

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
    /**
     * Pipes
     *
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

    /**
     * Interceptors
     */
    // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    // app.useGlobalInterceptors(new TransformInterceptor())
    app.useGlobalInterceptors(new TimeoutInterceptor())
    app.useGlobalInterceptors(new ExcludeNullUndefinedInterceptor())

    /**
     * Filters
     */
    // const { httpAdapter } = app.get(HttpAdapterHost)
    app.useGlobalFilters(new QueryFailedFilter())
    app.useGlobalFilters(new ValidationFailedFilter())

    /**
     * Guards (express specific)
     */
    // app.useGlobalGuards(new ResponseGuard())
    app.useGlobalGuards(new RequestGuard())

    // console.log(SpelunkerModule.explore(app))
}

function setupMiddlewares(app: INestApplication) {
    // middlewares (express specific)
    // app.use(helmet({ contentSecurityPolicy: false }))
    app.enableCors({ origin: '*' })

    // limit for all paths
    app.use(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 500, // limit each IP to 500 requests per windowMs
            message: 'Too many requests from this IP, please try again later',
        }),
    )

    // signup limiter
    app.use(
        '/auth/signup',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        rateLimit({
            windowMs: 60 * 60 * 1000, // 1 hour window
            max: 10, // start blocking after 10 requests
            message:
                'Too many signup request from this IP, please try again after an hour',
        }),
    )

    // @ts-ignore
    app.disable('ETag') // eslint-disable-line @typescript-eslint/no-unsafe-call

    // @ts-ignore
    app.disable('X-Powered-By') // eslint-disable-line @typescript-eslint/no-unsafe-call

    app.enableShutdownHooks()
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true })
    app.setGlobalPrefix('api')

    const config: ConfigService<EnvironmentVariables> = app.get(ConfigService)
    const isDev = config.get('NODE_ENV') === 'development'

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isDev &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        blockedAt(
            (
                time: number,
                stack: string[],
                { type, resource }: blockedAt.Resource,
            ) => {
                console.log(
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `[${type}] Blocked for ${time}ms, operation started here:\n`,
                    stack[stack.length - 1],
                    '\n',
                    resource,
                )

                if (type === 'HTTPPARSER' && resource) {
                    // resource structure in this example assumes Node 10.x
                    console.log(
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
                        `URL related to blocking operation: ${resource.resource.incoming.url}`,
                    )
                }
            },
            { trimFalsePositives: true },
        )

    setupSwaggerDocs(app)
    setupInfra(app)
    setupMiddlewares(app)

    await app.listen(+config.get('PORT') || 3000)

    return app
}

export function run(
    boot: () => Promise<INestApplication>,
    options = { inCluster: false },
) {
    const numberOfCores = os.cpus().length

    if (options.inCluster && cluster.isMaster) {
        for (let i = 0; i < numberOfCores; i++) {
            cluster.fork()
        }
    } else {
        boot()
            .then(({ getUrl }) => getUrl())
            .then((url) => {
                console.log(`Application is running on ${url}`) // eslint-disable-line no-console
            })
            .catch(console.error)
    }
}

run(bootstrap, { inCluster: false })
