import { Injectable } from '@nestjs/common';
import { type Prisma } from 'generated/prisma';

import { PrismaService } from '../prisma.service';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.prismaService.bankAccount.findMany({
      where: { userId },
    });

    return bankAccounts;
  }

  async findFirst(userId: string, bankAccountId: string) {
    const bankAccount = await this.prismaService.bankAccount.findFirst({
      where: { userId, id: bankAccountId },
    });

    return bankAccount;
  }

  //to-do: remove prisma type and create a custom type for the dto
  async create(dto: Prisma.BankAccountCreateArgs) {
    const bankAccount = await this.prismaService.bankAccount.create(dto);
    return bankAccount;
  }

  //to-do: remove prisma type and create a custom type for the dto
  async update(dto: Prisma.BankAccountUpdateArgs) {
    const bankAccount = await this.prismaService.bankAccount.update(dto);

    return bankAccount;
  }

  async remove(bankAccountId: string) {
    await this.prismaService.bankAccount.delete({
      where: { id: bankAccountId },
    });
  }
}
