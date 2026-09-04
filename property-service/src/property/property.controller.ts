import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Property } from './entities/proprety.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @HttpCode(HttpStatus.CREATED)
  @MessagePattern({ cmd: 'create_property' })
  async createProperty(@Payload() dto: CreatePropertyDto): Promise<Property> {
    console.log('🚀 ~ PropertyController ~ createProperty ~ dto:', dto);
    return await this.propertyService.createProperty(dto);
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: 'get_properties' })
  async getAllProperties(): Promise<Property[]> {
    return await this.propertyService.getAllProperties();
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: 'get_property' })
  async getPropertyById(@Payload() payload: { id: string }): Promise<Property> {
    return await this.propertyService.getPropertyById(payload.id);
  }
}
