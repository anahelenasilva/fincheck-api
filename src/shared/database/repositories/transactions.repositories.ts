import { Injectable } from '@nestjs/common';
import { type Prisma } from 'generated/prisma';

import { FindAllFiltersDto } from 'src/modules/transactions/dto/find-all-filters.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async findAllByUserId(userId: string, { month, year, bankAccountId, transactionType }: FindAllFiltersDto) {
    const jsMonth = month - 1; // JavaScript months are zero-based (0 = January, 11 = December)

    return await this.prismaService.transaction.findMany({
      where: {
        userId,
        ...(bankAccountId && { bankAccountId }),
        ...(transactionType && { type: transactionType }),
        date: {
          gte: new Date(Date.UTC(year, jsMonth)),
          lt: new Date(Date.UTC(year, jsMonth + 1)),
        }
      },
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
