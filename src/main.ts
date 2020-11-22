import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

const API_DEFAULT_PORT = 3000
const API_DEFAULT_PREFIX = '/api/v1'

const SWAGGER_TITLE = 'API'
const SWAGGER_DESCRIPTION = 'API'
const SWAGGER_PREFIX = '/docs'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(3000)

    console.log(`Application is running on: ${await app.getUrl()}`)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap().then((_) => _)
