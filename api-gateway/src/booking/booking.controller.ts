import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtGuard } from 'src/auth/jwt-auth.guard';

@Controller('booking')
@UseGuards(JwtGuard)
export class BookingController {
  constructor(
    @Inject('BOOKING_SERVICE') private readonly bookingService: ClientProxy,
  ) {}

  @Post(':id')
  async createBooking(@Req() req, @Param('id') id: string, @Body() data: any) {
    const payload = { userId: req.sub, propertyId: id, ...data };
    return await firstValueFrom(
      this.bookingService.send({ cmd: 'create_booking' }, payload),
    );
  }
}
