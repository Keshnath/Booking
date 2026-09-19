import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/proprety.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Pricing, PricingStatus } from 'src/pricings/entities/pricing.entity';
import { Details } from 'src/details/entities/property-detail.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Pricing)
    private readonly pricingRepository: Repository<Pricing>,
    @InjectRepository(Details)
    private readonly detailRepository: Repository<Details>,
  ) {}

  async createProperty(dto: CreatePropertyDto): Promise<Property> {
    const property = this.propertyRepository.create({
      userId: dto.sub,
      ...dto,
    });
    return await this.propertyRepository.save(property);
  }

  async getAllProperties(): Promise<Property[]> {
    return await this.propertyRepository.find();
  }

  async getPropertyById(id: string): Promise<Property> {
    const property = await this.propertyRepository.findOneBy({ id });

    if (!property) {
      throw new NotFoundException(`Property with ID "${id}" not found`);
    }

    return property;
  }

  async publishProperty(id: string) {
    const property = await this.propertyRepository.findBy({
      id: id,
    });
    const details = await this.detailRepository.findBy({
      propertyId: id,
    });
    const pricing = await this.pricingRepository.findBy({
      propertyId: id,
      status: PricingStatus.ACTIVE,
    });

    console.log(property , details , pricing)
  }
}
