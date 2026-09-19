import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PropertyModule } from './property/property.module';
import { HealthModule } from './health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailsModule } from './details/details.module';
import { PricingsModule } from './pricings/pricings.module';
import { ClientsModule } from '@nestjs/microservices/module/clients.module';
import { Transport } from '@nestjs/microservices/enums/transport.enum';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres', // Or 'mysql', 'sqlite'
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USERNAME', 'postgres'),
        password: config.get<string>('DB_PASSWORD', 'password'),
        database: config.get<string>('DB_NAME', 'property_service_db'),
        autoLoadEntities: true, // Automatically loads entities registered in submodules
        synchronize: true, // Set to false in production!
      }),
    }),

    ClientsModule.registerAsync([
      {
        name: 'RMQ_SEARCH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              configService.get<string>(
                'RABBITMQ_URL',
                'amqp://localhost:5672',
              ),
            ],
            exchange: 'property.events', // Topic exchange owned by Property Service
            exchangeType: 'topic', // Explicitly set topic exchange type
            // Omit `queue` here so Property Service acts purely as a producer emitting events.
            // Downstream consumers (like Search Service) define and bind their own queues.
            noAssert: false, // Ensures exchange is declared if it doesn't exist
            socketOptions: {
              heartbeatIntervalInSeconds: 60,
              reconnectTimeInSeconds: 5,
            },
          },
        }),
      },
    ]),
    PropertyModule,
    HealthModule,
    DetailsModule,
    PricingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
