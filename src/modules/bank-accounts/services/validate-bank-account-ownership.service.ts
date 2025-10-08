import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from '../../../shared/database/repositories/bankAccounts.repositories';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(private readonly bankAccountsRepo: BankAccountsRepository) { }

  async validate(userId: string, bankAccountId: string) {
    const bankAccount = await this.bankAccountsRepo.findFirst(userId, bankAccountId);

    if (!bankAccount) {
      throw new NotFoundException('Bank account not found');
    }
  }
}
