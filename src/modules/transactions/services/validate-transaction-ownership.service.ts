import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(private readonly transactionsRepo: TransactionsRepository) { }

  async validate(userId: string, transactionId: string) {
    const transaction = await this.transactionsRepo.findFirst(userId, transactionId);

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
  }
}
