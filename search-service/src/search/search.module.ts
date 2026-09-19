import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import {
  PropertySearch,
  PropertySearchSchema,
} from './entities/search.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PropertySearch.name, schema: PropertySearchSchema },
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
