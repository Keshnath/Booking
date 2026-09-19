import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtGuard } from '../auth/jwt-auth.guard';
import { firstValueFrom, retry } from 'rxjs';

@Controller('properties')
@UseGuards(JwtGuard)
export class PropertyController {
  constructor(
    @Inject('PROPERTY_SERVICE') private readonly propertyClient: ClientProxy,
  ) {}

  @Get('health')
  async healthCheck() {
    return await firstValueFrom(
      this.propertyClient.send({ cmd: 'health_check' }, {}),
    );
  }

  @Post()
  async addProperty(@Req() req, @Body() propertyData: any) {
    return await firstValueFrom(
      this.propertyClient.send(
        { cmd: 'create_property' },
        { sub: req.sub, ...propertyData },
      ),
    );
  }

  @Get()
  async getProperties(@Query() queryParams: any) {
    return await firstValueFrom(
      this.propertyClient.send({ cmd: 'get_properties' }, queryParams),
    );
  }

  @Get(':id')
  async getProperty(@Param('id') id: string) {
    return await firstValueFrom(
      this.propertyClient.send({ cmd: 'get_property' }, { id }),
    );
  }

  @Post(':propertyId/details')
  async addPropertyDetails(
    @Param('propertyId') propertyId: string,
    @Body() data: any,
  ) {
    const payload = { propertyId, ...data };
    return await firstValueFrom(
      this.propertyClient.send({ cmd: 'create_details' }, payload),
    );
  }

  @Get(':propertyId/details')
  async getPropertyDetails(@Param('propertyId') propertyId: string) {
    return await firstValueFrom(
      this.propertyClient.send({ cmd: 'get_details' }, { propertyId }),
    );
  }

  @Get(':propertyId/details/:id')
  async getPropertyDetail(
    @Param('propertyId') propertyId: string,
    @Param('id') id: string,
  ) {
    return await firstValueFrom(
      this.propertyClient.send({ cmd: 'get_detail' }, { propertyId, id }),
    );
  }

  @Get(':propertyId/pricings')
  async getPropertyPricings(@Param('propertyId') propertyId: string) {
    return await firstValueFrom(
      this.propertyClient.send({ cmd: 'get_pricings' }, { propertyId }),
    );
  }

  @Get(':propertyId/pricings/:id')
  async getPropertyPricing(
    @Param('propertyId') propertyId: string,
    @Param('id') id: string,
  ) {
    return await firstValueFrom(
      this.propertyClient.send({ cmd: 'get_pricing' }, { propertyId, id }),
    );
  }

  @Patch(':propertyId/details/:id')
  async updatePropertyDetails(
    @Param('propertyId') propertyId: string,
    @Param('id') id: string,
    @Body() data: any,
  ) {
    const payload = { propertyId, id, ...data };
    return await firstValueFrom(
      this.propertyClient.send({ cmd: 'update_details' }, payload),
    );
  }

  @Post(':propertyId/pricings')
  async addPropertyPricings(
    @Param('propertyId') propertyId: string,
    @Body() data: any,
  ) {
    const payload = { propertyId, ...data };
    console.log('Payload for creating property pricing:', payload);
    return await firstValueFrom(
      this.propertyClient.send({ cmd: 'create_pricing' }, payload),
    );
  }

  @Patch(':propertyId/pricings/:id')
  async updatePropertyPricings(
    @Param('propertyId') propertyId: string,
    @Param('id') id: string,
    @Body() data: any,
  ) {
    const payload = { propertyId, id, ...data };
    console.log('Payload for updating property pricing:', payload);
    return await firstValueFrom(
      this.propertyClient.send({ cmd: 'update_pricing' }, payload),
    );
  }

  @Post(':id')
  async publishProperty(@Param() id: string) {
    return firstValueFrom(
      this.propertyClient.send({ cmd: 'publish_property' }, {}),
    );
  }
}
