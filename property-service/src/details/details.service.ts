import { Inject, Injectable } from '@nestjs/common';
import { CreatePropertyDetailDto } from './dto/create-property-detail.dto';
import { UpdatePropertyDetailDto } from './dto/update-property-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Details } from './entities/property-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetailsService {
  constructor(
    @InjectRepository(Details)
    private readonly detailRepository: Repository<Details>,
  ) {}

  async createDetails(createDetails: CreatePropertyDetailDto) {
    try {
      return await this.detailRepository.insert(createDetails);
    } catch (error) {
      throw error;
    }
  }

  async updateDetails(updateDetails: UpdatePropertyDetailDto) {
    try {
      const { propertyId, id, ...updateData } = updateDetails;
      return await this.detailRepository.update({ propertyId, id }, updateData);
    } catch (error) {
      throw error;
    }
  }

  async getDetails(payload: { propertyId: string }) {
    try {
      return await this.detailRepository.find({ where: { propertyId: payload.propertyId } });
    } catch (error) {
      throw error;
    }
  }

  async getDetail(payload: { propertyId: string, id: string }) {
    try {
      return await this.detailRepository.findOne({ where: { propertyId: payload.propertyId, id: payload.id } });
    } catch (error) {
      throw error;
    }
  }

}
