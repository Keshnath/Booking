// api-gateway/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { RpcToHttpExceptionFilter } from './common/rpc-exception.filter';
import { RpcException } from '@nestjs/microservices';

async function bootstrap() {
  // 1. Create standard HTTP server instance
  const app = await NestFactory.create(AppModule);

  // 2. Extract ConfigService directly from app instance
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT', 3000);

  // 3. Attach Global Validation Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((err) =>
          Object.values(err.constraints || {}).join(', '),
        );
        return new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: messages,
          error: 'Bad Request',
        });
      },
    }),
  );
  app.useGlobalFilters(new RpcToHttpExceptionFilter());

  // 4. Start HTTP Server
  await app.listen(PORT);
  console.log(`API Gateway HTTP Server is running on http://localhost:${PORT}`);
}
bootstrap();
