// api-gateway/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { BookingController } from './booking/booking.controller';
import { PropertyController } from './property/property.controller';
import { HealthModule } from './health/health.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET', 'super-secret-key'),
      }),
    }),
    // Dynamic Registration of downstream microservices
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('AUTH_SERVICE_HOST', '127.0.0.1'),
            port: config.get<number>('AUTH_SERVICE_PORT', 3001),
          },
        }),
      },
      {
        name: 'BOOKING_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('BOOKING_SERVICE_HOST', '127.0.0.1'),
            port: config.get<number>('BOOKING_SERVICE_PORT', 3002),
          },
        }),
      },
      {
        name: 'INVENTORY_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('INVENTORY_SERVICE_HOST', '127.0.0.1'),
            port: config.get<number>('INVENTORY_SERVICE_PORT', 3003),
          },
        }),
      },
      {
        name: 'PAYMENT_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('PAYMENT_SERVICE_HOST', '127.0.0.1'),
            port: config.get<number>('PAYMENT_SERVICE_PORT', 3004),
          },
        }),
      },
      {
        name: 'PROPERTY_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('PROPERTY_SERVICE_HOST', '127.0.0.1'),
            port: config.get<number>('PROPERTY_SERVICE_PORT', 3005),
          },
        }),
      },
    ]),
    HealthModule
  ],
  controllers: [AuthController, BookingController, PropertyController],
})
export class AppModule {}
