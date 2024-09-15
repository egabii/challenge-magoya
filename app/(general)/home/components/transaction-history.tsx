"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function TransactionsHistory() {
  //Fecha, monto, tipo de transacción.
  const transactions = [
    {
      id: "INV001",
      amount: 1232.22,
      transactionType: "Deposito",
      createdAt: new Date().toString(),
    },
    {
      id: "INV002",
      amount: 700.0,
      transactionType: "Deposito",
      createdAt: new Date().toString(),
    },
    {
      id: "INV003",
      amount: 910.0,
      transactionType: "Retiro",
      createdAt: new Date().toString(),
    },
    {
      id: "INV004",
      amount: 910.0,
      transactionType: "Deposito",
      createdAt: new Date().toString(),
    },
    {
      id: "INV005",
      amount: 910.0,
      transactionType: "Retiro",
      createdAt: new Date().toString(),
    },
    {
      id: "INV006",
      amount: 910.0,
      transactionType: "Deposito",
      createdAt: new Date().toString(),
    },
    {
      id: "INV007",
      amount: 910.0,
      transactionType: "Retiro",
      createdAt: new Date().toString(),
    },
  ];
  return (
    <Table>
      <TableCaption>A list of your recent ids.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Transaccion</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead className="text-right">Monto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.transactionType}</TableCell>
            <TableCell>{transaction.createdAt}</TableCell>
            <TableCell className="text-right">{transaction.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
