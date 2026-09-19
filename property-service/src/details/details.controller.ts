import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DetailsService } from './details.service';
import { CreatePropertyDetailDto } from './dto/create-property-detail.dto';
import { UpdatePropertyDetailDto } from './dto/update-property-detail.dto';

@Controller()
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @MessagePattern({ cmd: 'create_details' })
  async create(@Payload() createDetailDto: CreatePropertyDetailDto) {
    return await this.detailsService.createDetails(createDetailDto);
  }

  @MessagePattern({ cmd: 'update_details' })
  async update(@Payload() updateDetailDto: UpdatePropertyDetailDto) {
    return await this.detailsService.updateDetails(updateDetailDto);
  }

  @MessagePattern({ cmd: 'get_details' })
  async get(@Payload() payload: { propertyId: string }) {
    return await this.detailsService.getDetails(payload);
  }

  @MessagePattern({ cmd: 'get_detail' })
  async getDetail(@Payload() payload: { propertyId: string, id: string }) {
    return await this.detailsService.getDetail(payload);
  }




}
