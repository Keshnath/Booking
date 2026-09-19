import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PricingsService } from './pricings.service';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';

@Controller()
export class PricingsController {
  constructor(private readonly pricingsService: PricingsService) {}

  @MessagePattern({ cmd: 'create_pricing' })
  async create(@Payload() createPricingDto: CreatePricingDto) {
    return await this.pricingsService.create(createPricingDto);
  }

  @MessagePattern({ cmd: 'update_pricing' })
  async update(@Payload() updatePricingDto: UpdatePricingDto) {
    return await this.pricingsService.update(
      updatePricingDto.id,
      updatePricingDto,
    );
  }

    @MessagePattern({cmd : 'get_pricings'})
  async getPricings(@Payload() payload: { propertyId: string }) {
    return await this.pricingsService.getPricings(payload);
  }

    @MessagePattern({cmd : 'get_pricing'})
  async getPricing(@Payload() payload: { propertyId: string, id: string }) {
    return await this.pricingsService.getPricing(payload);
  }

}
