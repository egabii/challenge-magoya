export interface IAccount {
  id: number;
  name: string;
  accountNumber: number;
  balance: number;
}

export type TransactionType = "Retiro" | "Deposito";
export interface ITransaction {
  id: string;
  amount: number;
  transactionType: TransactionType;
  createdAt: string;
  accountNumber: number;
}
