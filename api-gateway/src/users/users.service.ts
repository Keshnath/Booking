import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  createUser(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return {
      message: 'User received successfully',
      user: {
        name: data.name,
        email: data.email,
      },
    };
  }
}