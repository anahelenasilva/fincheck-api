import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { UsersRepository } from '../../shared/database/repositories/users.repositories';
import { AuthenticateDto } from './dto/authenticate.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService
  ) { }

  async authenticate({ email, password }: AuthenticateDto) {
    const user = await this.usersRepo.findUnique({
      where: { email },
    });

    if (!user) {
      return new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
    });

    return { accessToken };
  }
}
