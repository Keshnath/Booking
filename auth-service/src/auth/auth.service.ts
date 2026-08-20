import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
  ) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = this.userRepository.create({
      name,
      email,
      passwordHash,
    });

    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
    };
  }

  async login(
    email: string,
    password: string,
  ) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken =
      await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}