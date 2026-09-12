import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pricing, PricingStatus } from './entities/pricing.entity';
import { Not, Repository } from 'typeorm';
import { ClientProxy, MessagePattern, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { STATUS_CODES } from 'http';

@Injectable()
export class PricingService {

  constructor(
    @InjectRepository(Pricing)
    private readonly pricingRepository: Repository<Pricing>,
    @Inject('PROPERTY_SERVICE') private readonly propertyService: ClientProxy
  ) { }

  async create(createPricingDto: CreatePricingDto) {
    try {
      const { price, propertyId } = createPricingDto
      const property = await firstValueFrom(this.propertyService.send({ cmd: 'get_property' }, { id: propertyId }))
  
      if (!property) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Property with ID "${propertyId}" does not exist`,
          error: 'Not Found',
        });
      }

      const newPrice = await this.pricingRepository.save(
        this.pricingRepository.create({ propertyId, price }),
      );

      await this.pricingRepository.update(
        {
          propertyId,
          id: Not(newPrice.id), // Exclude the newly created ID
          status: PricingStatus.ACTIVE, // Only archive currently active ones
        },
        { status: PricingStatus.ARCHIVE },
      );

      return newPrice
    } catch (error) {
      throw error
    }


  }

}
