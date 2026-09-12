import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('inventories')
export class InventoriesController {
  constructor( @Inject("INVENTORY_SERVICE") private readonly inventoriesService: ClientProxy) {}


  @Get('health')
  async health() {
    return await firstValueFrom(this.inventoriesService.send({ cmd: 'health_check' }, {}));
  }

  @Post()
  async create(@Body() createInventoryDto: any) {
    return await firstValueFrom( this.inventoriesService.send({ cmd: 'create-inventory' }, createInventoryDto))
  }

  @Get()
  async findAll() {
    return await firstValueFrom(this.inventoriesService.send({ cmd: 'find-all-inventories' }, {}));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await firstValueFrom(this.inventoriesService.send({ cmd: 'find-inventory' }, { id: +id }));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateInventoryDto: any) {
    return await firstValueFrom(this.inventoriesService.send({ cmd: 'update-inventory' }, { id: +id, ...updateInventoryDto }));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await firstValueFrom(this.inventoriesService.send({ cmd: 'delete-inventory' }, { id: +id }));
  }
}
