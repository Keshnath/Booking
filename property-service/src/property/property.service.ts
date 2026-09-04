import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/proprety.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async createProperty(dto: CreatePropertyDto): Promise<Property> {
    const property = this.propertyRepository.create({userId:dto.sub , ...dto});
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

}
