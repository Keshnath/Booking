import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePricingDto } from './dto/update-pricing.dto';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pricing, PricingStatus } from './entities/pricing.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PricingsService {
  constructor(
    @InjectRepository(Pricing)
    private readonly pricingRepository: Repository<Pricing>,
  ) {}

  async create(createPricingDto: CreatePricingDto) {
    await this.pricingRepository.update(
      {
        propertyId: createPricingDto.propertyId,
        status: PricingStatus.ACTIVE,
      },
      {
        status: PricingStatus.ARCHIVE,
      },
    );

    const newPrice = this.pricingRepository.create({
      ...createPricingDto,
      status: PricingStatus.ACTIVE,
    });
    return await this.pricingRepository.save(newPrice);
  }

  async update(id: string, updatePricingDto: UpdatePricingDto) {
    try {
      // 1. Find existing record by ID (or propertyId depending on your schema)
      const pricing = await this.pricingRepository.findOneBy({ id });

      // 2. Throw exception if record does not exist
      if (!pricing) {
        throw new RpcException(`Pricing record with ID "${id}" not found`);
      }

      // 2. Archive all currently active prices for this property
      await this.pricingRepository.update(
        {
          propertyId: pricing.propertyId,
          status: PricingStatus.ACTIVE,
        },
        {
          status: PricingStatus.ARCHIVE,
        },
      );

      // 3. Create a brand-new active pricing record with the updated price
      const newPricing = this.pricingRepository.create({
        propertyId: pricing.propertyId,
        price: updatePricingDto.price ?? pricing.price,
        status: PricingStatus.ACTIVE,
      });

      // 4. Return the new active entity (with its new ID)
      return await this.pricingRepository.save(newPricing);
    } catch (error: any) {
      console.error('Error updating pricing record:', error);
      throw new RpcException(
        `Error updating pricing record: ${error?.message}`,
      );
    }
  }

  async getPricings(payload: { propertyId: string }) {
    try {
      return await this.pricingRepository.find({
        where: { propertyId: payload.propertyId },
      });
    } catch (error: any) {
      throw new RpcException(`Error fetching pricings: ${error.message}`);
    }
  }

  async getPricing(payload: { propertyId: string; id: string }) {
    try {
      const pricing = await this.pricingRepository.findOne({
        where: { propertyId: payload.propertyId, id: payload.id },
      });
      if (!pricing) {
        throw new RpcException(
          `Pricing record with ID "${payload.id}" not found`,
        );
      }
      return pricing;
    } catch (error: any) {
      throw new RpcException(`Error fetching pricing: ${error.message}`);
    }
  }
}
