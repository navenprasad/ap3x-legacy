import { NestFactory } from '@nestjs/core';
import { LlmModule } from './llm.module';

async function bootstrap() {
  const app = await NestFactory.create(LlmModule);
  await app.listen(3000);
}
bootstrap();
