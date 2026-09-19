import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PropertySearch } from './entities/search.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(PropertySearch.name)
    private readonly propertySearchModel: Model<PropertySearch>,
  ) {}

  // 1. Base Property Upsert (From Property Service)
  async upsertPropertyBase(data: { propertyId: string; userId: string; name: string; description: string }) {
    return this.propertySearchModel.findOneAndUpdate(
      { propertyId: data.propertyId },
      {
        $set: {
          userId: data.userId,
          name: data.name,
          description: data.description,
        },
      },
      { upsert: true, new: true },
    ).exec();
  }

  // 2. Details Upsert (From Property Details Service)
  async upsertDetails(propertyId: string, details: any) {
    return this.propertySearchModel.findOneAndUpdate(
      { propertyId },
      { $set: { details } },
      { upsert: true, new: true },
    ).exec();
  }

  // 3. Pricing Upsert (From Pricing Service)
  async upsertPricing(propertyId: string, pricing: any) {
    return this.propertySearchModel.findOneAndUpdate(
      { propertyId },
      { $set: { pricing } },
      { upsert: true, new: true },
    ).exec();
  }

  // 4. Block Unavailable Dates (From Inventory Service)
  async addUnavailableDates(propertyId: string, dates: string[]) {
    return this.propertySearchModel.findOneAndUpdate(
      { propertyId },
      {
        $addToSet: {
          'inventory.UnavailableDates': { $each: dates },
        },
      },
      { upsert: true, new: true },
    ).exec();
  }

  // 5. Unblock Dates on Cancellation (From Inventory Service)
  async removeUnavailableDates(propertyId: string, dates: string[]) {
    return this.propertySearchModel.findOneAndUpdate(
      { propertyId },
      {
        $pull: {
          'inventory.UnavailableDates': { $in: dates },
        },
      },
      { new: true },
    ).exec();
  }
}