import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { ValidateEntitiesOwnershipDto } from '../dto/validate-entities-ownership.dto';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
  ) { }

  async create(userId: string, dto: CreateTransactionDto) {
    const { bankAccountId, categoryId, name, amount, type, date } = dto;

    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId });

    return await this.transactionsRepo.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        name,
        amount,
        type,
        date
      }
    });
  }

  async findAllByUserId(userId: string) {
    return await this.transactionsRepo.findAllByUserId(userId);
  }

  async update(userId: string, transactionId: string, dto: UpdateTransactionDto) {
    const { bankAccountId, categoryId, name, amount, type, date } = dto;

    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId, transactionId });

    return await this.transactionsRepo.update({
      where: { id: transactionId },
      data: {
        bankAccountId,
        categoryId,
        name,
        amount,
        type,
        date,
      },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateTransactionOwnershipService.validate(userId, transactionId);
    await this.transactionsRepo.remove(transactionId);
  }

  private async validateEntitiesOwnership({ userId, bankAccountId, categoryId, transactionId }: ValidateEntitiesOwnershipDto) {
    await Promise.all([
      transactionId && this.validateTransactionOwnershipService.validate(userId, transactionId),
      this.validateBankAccountOwnershipService.validate(userId, bankAccountId),
      this.validateCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
