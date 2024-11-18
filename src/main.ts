import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: [
      configService.get<string>('CORS_ORIGIN_1'),
      configService.get<string>('CORS_ORIGIN_2'),
    ],
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
