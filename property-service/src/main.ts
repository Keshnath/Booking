import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 3004;
  app.useGlobalPipes(new ValidationPipe({
    transform : true,
    whitelist : true
  }))
  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
}
bootstrap();
