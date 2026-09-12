import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PricingService } from './pricing.service';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';

@Controller()
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @MessagePattern({cmd : 'create_price'})
  create(@Payload() createPricingDto: CreatePricingDto) {
    return this.pricingService.create(createPricingDto);
  }



 
}
