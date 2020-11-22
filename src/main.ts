import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const API_DEFAULT_PORT = 3000
const API_DEFAULT_PREFIX = '/api/v1'

const SWAGGER_TITLE = 'API'
const SWAGGER_DESCRIPTION = 'API'
const SWAGGER_PREFIX = '/docs'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    await app.listen(3000)
}

bootstrap().then((_) => _)
