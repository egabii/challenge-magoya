import { ITransaction } from "./definitions";

export function randomDate(start: Date, end: Date): string {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().split(".")[0];
}

export const transactionsCollection: ITransaction[] = [
  {
    id: "tx_0",
    amount: 565.61,
    transactionType: "Deposito",
    createdAt: randomDate(new Date("2024-01-01"), new Date("2024-09-15")),
  },
  {
    id: "tx_1",
    amount: 190.87,
    transactionType: "Retiro",
    createdAt: randomDate(new Date("2024-01-01"), new Date("2024-09-15")),
  },
  {
    id: "tx_2",
    amount: 908.39,
    transactionType: "Retiro",
    createdAt: randomDate(new Date("2024-01-01"), new Date("2024-09-15")),
  },
  {
    id: "tx_3",
    amount: 167.73,
    transactionType: "Retiro",
    createdAt: randomDate(new Date("2024-01-01"), new Date("2024-09-15")),
  },
  {
    id: "tx_4",
    amount: 562.86,
    transactionType: "Deposito",
    createdAt: randomDate(new Date("2024-01-01"), new Date("2024-09-15")),
  },
  {
    id: "tx_5",
    amount: 71.05,
    transactionType: "Retiro",
    createdAt: randomDate(new Date("2024-01-01"), new Date("2024-09-15")),
  },
  {
    id: "tx_6",
    amount: 729.53,
    transactionType: "Deposito",
    createdAt: randomDate(new Date("2024-01-01"), new Date("2024-09-15")),
  },
  {
    id: "tx_7",
    amount: 752.08,
    transactionType: "Deposito",
    createdAt: randomDate(new Date("2024-01-01"), new Date("2024-09-15")),
  },
  {
    id: "tx_8",
    amount: 644.4,
    transactionType: "Retiro",
    createdAt: randomDate(new Date("2024-01-01"), new Date("2024-09-15")),
  },
  {
    id: "tx_9",
    amount: 155.97,
    transactionType: "Retiro",
    createdAt: randomDate(new Date("2024-01-01"), new Date("2024-09-15")),
  },
];
