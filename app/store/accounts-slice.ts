import { createAppSlice } from "@/app/store/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAccount } from "@/lib/definitions";

export const initialState: IAccount = {
  id: 0,
  name: "",
  balance: 0,
  accountNumber: 0,
};

export const accountSlice = createAppSlice({
  name: "account",
  initialState,
  reducers: (create) => ({
    incrementBalance: create.reducer((state, action: PayloadAction<number>) => {
      state.balance += action.payload;
    }),
    decrementBalance: create.reducer((state, action: PayloadAction<number>) => {
      state.balance -= action.payload;
    }),
    setAccount: create.reducer((state, action: PayloadAction<IAccount>) => {
      state.accountNumber = action.payload.accountNumber;
      state.name = action.payload.name;
      state.balance = action.payload.balance;
      state.id = action.payload.id;
    }),
  }),
  selectors: {
    selectBalance: (account) => account.balance,
    selectAccountDetail: ({ name, accountNumber }) => ({
      name,
      accountNumber,
    }),
  },
});

export const { incrementBalance, decrementBalance, setAccount } =
  accountSlice.actions;

export const { selectBalance, selectAccountDetail } = accountSlice.selectors;
