import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TodoModule } from './todo.module';
async function bootstrap() {
  const app = await NestFactory.create(TodoModule);

  const config = new DocumentBuilder()
    .setTitle('ap3x')
    .setDescription('The ap3x API description')
    .setVersion('1.0')
    .addTag('ap3x')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
