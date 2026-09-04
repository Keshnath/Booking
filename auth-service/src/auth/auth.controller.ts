import { Controller, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth_register' })
  register(@Payload() registerDto: RegisterDto) {
    this.logger.log(`Registering ${registerDto.email}`);
    return this.authService.register(
      registerDto.name,
      registerDto.email,
      registerDto.password,
      registerDto.role
    );
  }

  @MessagePattern({ cmd: 'auth_login' })
  login(@Payload() loginDto: LoginDto) {
    this.logger.log(`Logging in ${loginDto.email}`);
    return this.authService.login(
      loginDto.email,
      loginDto.password,
    );
  }
}
