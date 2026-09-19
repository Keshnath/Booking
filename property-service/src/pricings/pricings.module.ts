import { Module } from '@nestjs/common';
import { PricingsService } from './pricings.service';
import { PricingsController } from './pricings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from 'src/property/entities/proprety.entity';
import { Pricing } from './entities/pricing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pricing])],
  controllers: [PricingsController],
  providers: [PricingsService],
})
export class PricingsModule {}
