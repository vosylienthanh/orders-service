import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './configs/config.services';
import { ApiKeyMiddleware } from './middlewares/api-key.middleware';

async function bootstrap() {
  const configService = new ConfigService();
  ApiKeyMiddleware.config({
    apiKey: configService.API_KEY,
    header: configService.API_KEY_HEADER,
  });

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.PORT);
}
bootstrap();
