import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Property} from './entities/proprety.entity'
import { Pricing } from 'src/pricings/entities/pricing.entity';
import { Details } from 'src/details/entities/property-detail.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([Property, Details , Pricing])
  ],
  controllers: [PropertyController],
  providers: [PropertyService]
})
export class PropertyModule {}
