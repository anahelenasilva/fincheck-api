import { Injectable } from '@nestjs/common';
import { BankAccountsRepository } from '../../../shared/database/repositories/bankAccounts.repositories';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) { }

  async create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, initialBalance, type, color } = createBankAccountDto;

    return await this.bankAccountsRepo.create({
      data: {
        userId,
        name,
        initialBalance,
        type,
        color,
      },
    });
  }

  async findAllByUserId(userId: string) {
    return await this.bankAccountsRepo.findAllByUserId(userId);
  }

  async update(userId: string, bankAccountId: string, updateBankAccountDto: UpdateBankAccountDto) {
    await this.validateBankAccountOwnershipService.validate(userId, bankAccountId);

    const { name, color, type, initialBalance } = updateBankAccountDto;

    return await this.bankAccountsRepo.update({
      where: { id: bankAccountId },
      data: {
        userId,
        name: name,
        color: color,
        type: type,
        initialBalance: initialBalance,
      },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(userId, bankAccountId);

    return await this.bankAccountsRepo.remove(bankAccountId);
  }
}
