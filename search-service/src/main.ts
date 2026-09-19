import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import {
  Transport,
  MicroserviceOptions,
  RpcException,
} from '@nestjs/microservices';

async function bootstrap() {
  // Initialize context to access ConfigService
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);

  const PORT = configService.get<number>('PORT', 3006);
  const HOST = configService.get<string>('HOST', '127.0.0.1');

  // Close context before instantiating microservice
  await appContext.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: HOST,
        port: PORT,
      },
    },
  );

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
app.enableShutdownHooks();
  await app.listen();
  console.log(`Search service is up on TCP ${HOST}:${PORT}`);
}
bootstrap();
