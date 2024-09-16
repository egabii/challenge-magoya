import { createAppSlice } from "@/app/store/createAppSlice";
import { ITransaction } from "@/lib/definitions";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TransactionSliceState {
  transactions: ITransaction[];
}

const initialState: TransactionSliceState = {
  transactions: [],
};

export const transactionsSlice = createAppSlice({
  name: "transactions",
  initialState,
  reducers: (create) => ({
    setTransactions: create.reducer(
      (state, action: PayloadAction<ITransaction[]>) => {
        state.transactions = action.payload;
      }
    ),
  }),
  selectors: {
    selectTransactions: (transactions) => transactions.transactions, // serian getters
    selectTransactionsByAscOrder: (transactions) => {
      return [...transactions.transactions].sort(function (a, b) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    },
  },
});

export const { setTransactions } = transactionsSlice.actions;

export const { selectTransactions, selectTransactionsByAscOrder } =
  transactionsSlice.selectors;
