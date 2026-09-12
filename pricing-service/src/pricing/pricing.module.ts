import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { Pricing } from './entities/pricing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pricing]),
    ClientsModule.registerAsync([
      {
        name: 'PROPERTY_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('INVENTORY_SERVICE_HOST', '127.0.0.1'),
            port: config.get<number>('INVENTORY_SERVICE_PORT', 3005),
          },
        }),
      },
    ]),
  ],
  controllers: [PricingController],
  providers: [PricingService],
})
export class PricingModule {}
