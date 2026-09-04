import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtGuard } from 'src/auth/jwt-auth.guard';

@Controller('properties')
@UseGuards(JwtGuard)
export class PropertyController {
  constructor(
    @Inject('PROPERTY_SERVICE') private readonly propertyClient: ClientProxy,
  ) {}

  @Post()
  addProperty(@Req() req, @Body() propertyData: any) {
    return this.propertyClient.send(
      { cmd: 'create_property' },
      { sub: req.sub, ...propertyData },
    );
  }

  @Get()
  getProperties(@Query() queryParams: any) {
    return this.propertyClient.send({ cmd: 'get_properties' }, queryParams);
  }

  @Get(':id')
  getProperty(@Param('id') id: string) {
    return this.propertyClient.send({ cmd: 'get_property' }, { id });
  }
}
