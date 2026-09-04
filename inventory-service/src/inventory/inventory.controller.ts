import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateHoldDto } from './dto/create-hold.dto';
import { Inventory } from './entities/inventory.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class InventoryController {
  constructor(private readonly inventory: InventoryService) {}

  @MessagePattern({ cmd: 'hold_inventory' })
  async createInventoryHold(@Payload() dto: CreateHoldDto) {
    return await this.inventory.createInventoryHold(dto);
  }
}
