import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BookingService } from './booking.service';
import { BookingDTO } from './dto/booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @MessagePattern({ cmd: 'create_booking' })
  async createBooking(@Payload() bookingData: BookingDTO) {
    return await this.bookingService.createBooking(bookingData);
  }
}
