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

@Controller()
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @MessagePattern({ cmd: 'create_property' })
  async createProperty(@Payload() dto: CreatePropertyDto): Promise<Property> {
    return await this.propertyService.createProperty(dto);
  }

  @MessagePattern({ cmd: 'get_properties' })
  async getAllProperties(): Promise<Property[]> {
    return await this.propertyService.getAllProperties();
  }

  @MessagePattern({ cmd: 'get_property' })
  async getPropertyById(@Payload() payload: { id: string }): Promise<Property> {
    return await this.propertyService.getPropertyById(payload.id);
  }

  @MessagePattern({cmd : "publish_property"})
  async publishProperty(@Payload() payload : {id : string}){
    return await this.propertyService.publishProperty(payload.id)
  }

}
