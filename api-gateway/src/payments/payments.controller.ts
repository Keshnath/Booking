import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';



@Controller('payments')
export class PaymentsController {
  constructor( @Inject("PAYMENT_SERVICE") private readonly paymentsService: ClientProxy) {}

  @Get('health')
  async health() {
    return await firstValueFrom(this.paymentsService.send({ cmd: 'health_check' }, {}));
  }

  @Post()
  async create(@Body() createPaymentDto: any) {
    return await firstValueFrom(this.paymentsService.send({ cmd: 'create-payment' }, createPaymentDto));
  }

  @Get()
  async findAll() {
    return await firstValueFrom(this.paymentsService.send({ cmd: 'find-all-payments' }, {}));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await firstValueFrom(this.paymentsService.send({ cmd: 'find-payment' }, { id: +id }));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePaymentDto: any) {
    return await firstValueFrom(this.paymentsService.send({ cmd: 'update-payment' }, { id: +id, ...updatePaymentDto }));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await firstValueFrom(this.paymentsService.send({ cmd: 'delete-payment' }, { id: +id }));
  }
}
