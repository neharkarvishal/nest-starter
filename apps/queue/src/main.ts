import { NestFactory } from '@nestjs/core'

import { QueueModule } from 'apps/queue/src/queue.module'

async function bootstrap() {
    const app = await NestFactory.create(QueueModule)
    await app.listen(4000)
}
bootstrap()
