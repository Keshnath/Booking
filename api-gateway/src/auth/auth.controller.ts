import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Post('login')
  async login(@Body() loginDto: any) {
    const data = await firstValueFrom(
      this.authClient.send({ cmd: 'auth_login' }, loginDto),
    );
    return data;
  }

  @Post('register')
  async register(@Body() registerDto: any) {
    return await firstValueFrom(
      this.authClient.send({ cmd: 'auth_register' }, registerDto),
    );
  }
}
