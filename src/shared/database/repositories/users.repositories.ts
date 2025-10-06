import { Injectable } from '@nestjs/common';
import { type Prisma } from 'generated/prisma';

import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async create(dto: Prisma.UserCreateArgs) {
    const user = await this.prismaService.user.create(dto);
    return user;
  }

  async findUnique(dto: Prisma.UserFindUniqueArgs) {
    const user = await this.prismaService.user.findUnique(dto);
    return user;
  }
}
