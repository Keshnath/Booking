import { Body, Controller, Get, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { firstValueFrom } from 'rxjs';
import { JwtGuard } from 'src/auth/jwt-auth.guard';

@Controller('pricings')
@UseGuards(JwtGuard)
export class PricingsController {
  constructor(
    @Inject('PRICING_SERVICE') private readonly pricingService: ClientProxy,
  ) {}
  @Get('health')
  async health() {
    return await firstValueFrom(
      this.pricingService.send({ cmd: 'health_check' }, {}),
    );
  }

  @Post(':id')
  async createPrice(@Req() req ,@Param('id') propertyId : string ,  @Body() data : any  ){
    const payload = {propertyId : propertyId , ...data}
    return firstValueFrom(this.pricingService.send({cmd : "create_price"},payload))
  }

}
