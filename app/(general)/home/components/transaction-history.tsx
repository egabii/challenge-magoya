"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currencyFormat } from "@/lib/utils";
import { selectTransactionsByAscOrder } from "@/app/store/transactions-slice";
import { useAppSelector } from "@/app/store/hooks";
import { Intl_config } from "@/lib/utils";

const formatDate = (aDate: string) => {
  const date = new Date(aDate);
  return new Intl.DateTimeFormat(Intl_config.locale).format(date);
};

const addColorByTransactionType = (type: string) => {
  return type === "Deposito" ? "text-green-500" : "text-red-500";
};

export default function TransactionsHistory() {
  const transactions = useAppSelector(selectTransactionsByAscOrder);
  return (
    <Table>
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
            <TableCell>{formatDate(transaction.createdAt)}</TableCell>
            <TableCell
              className={`text-right ${addColorByTransactionType(
                transaction.transactionType
              )}`.trim()}
            >
              {currencyFormat(transaction.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        {false && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </TableFooter>
    </Table>
  );
}
