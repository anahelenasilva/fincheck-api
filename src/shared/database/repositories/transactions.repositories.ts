import { Injectable } from '@nestjs/common';
import { type Prisma } from 'generated/prisma';

import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async findAllByUserId(userId: string) {
    return await this.prismaService.transaction.findMany({
      where: { userId },
    });
  }

  async findFirst(userId: string, transactionId: string) {
    return await this.prismaService.transaction.findFirst({
      where: { userId, id: transactionId },
    });
  }

  //to-do: remove prisma type and create a custom type for the dto
  async create(dto: Prisma.TransactionCreateArgs) {
    return await this.prismaService.transaction.create(dto);
  }

  //to-do: remove prisma type and create a custom type for the dto
  async update(dto: Prisma.TransactionUpdateArgs) {
    return await this.prismaService.transaction.update(dto);
  }

  async remove(transactionId: string) {
    await this.prismaService.transaction.delete({
      where: { id: transactionId },
    });
  }
}
