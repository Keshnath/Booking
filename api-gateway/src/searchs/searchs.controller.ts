import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('searchs')
export class SearchsController {
  constructor(@Inject('SEARCH_SERVICE') private searchService: ClientProxy) {}

  @Get('health')
  async health() {
    return await firstValueFrom(
      this.searchService.send({ cmd: 'health_check' }, {}),
    );
  }
}
