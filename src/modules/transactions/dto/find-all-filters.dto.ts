import { TransactionType } from "../entities/Transaction";

export type FindAllFiltersDto = {
  month: number;
  year: number;
  bankAccountId?: string;
  transactionType?: TransactionType;
}
