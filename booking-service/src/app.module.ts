import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthService } from './health/health.service';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingModule } from './booking/booking.module';

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
        database: config.get<string>('DB_NAME', 'booking_service_db'),
        autoLoadEntities: true, // Automatically loads entities registered in submodules
        synchronize: true, // Set to false in production!
      }),
    }),
    HealthModule,
    BookingModule,
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class AppModule {}
