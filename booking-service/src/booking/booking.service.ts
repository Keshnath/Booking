import { Inject, Injectable } from '@nestjs/common';
import { BookingDTO } from './dto/booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingEntity } from './entities/booking.entity';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    @Inject('INVENTORY_SERVICE') private readonly inventoryService: ClientProxy,
  ) {}

  async createBooking(payload: BookingDTO) {
    try {
      const data = await firstValueFrom(
        this.inventoryService.send({ cmd: 'hold_inventory' }, payload),
      );
      console.log('🚀 ~ BookingService ~ createBooking ~ data:', data);
      return data;
    } catch (error) {
      console.log('🚀 ~ BookingService ~ createBooking ~ error:', error);
    }
  }
}
