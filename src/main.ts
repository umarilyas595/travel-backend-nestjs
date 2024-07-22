import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3001;
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(Number(port));
  console.log('service running on port', await app.getUrl());
}
bootstrap();
