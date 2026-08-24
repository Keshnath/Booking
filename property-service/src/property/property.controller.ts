import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Property } from './entities/proprety.entity';

@Controller('properties')
export class PropertyController {
    constructor(private readonly propertyService: PropertyService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createProperty(@Body() dto: CreatePropertyDto):Promise<Property> {
        return await this.propertyService.createProperty(dto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllProperties():Promise<Property[]> {
        return await this.propertyService.getAllProperties();
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async getPropertyById(@Param("id" ,ParseUUIDPipe) id: string): Promise<Property> {
        return await this.propertyService.getPropertyById(id);
    }
}
