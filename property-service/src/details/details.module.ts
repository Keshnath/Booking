import { Module } from '@nestjs/common';
import { DetailsService } from './details.service';
import { DetailsController } from './details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from 'src/property/entities/proprety.entity';
import { Details } from './entities/property-detail.entity';

@Module({
  imports :[
    TypeOrmModule.forFeature([Details])
  ],
  controllers: [DetailsController],
  providers: [DetailsService],
})
export class DetailsModule {}
