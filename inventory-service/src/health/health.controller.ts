import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @MessagePattern({ cmd: 'health_check' })
  getHealth() {
    return this.healthService.getHealth();
  }
}
