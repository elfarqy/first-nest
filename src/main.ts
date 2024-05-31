import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ContentType } from './interceptor/content-type';
import { TransformInterceptor } from './interceptor/bigint.interceptor';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ContentType());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
