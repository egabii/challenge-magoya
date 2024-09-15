import { createAppSlice } from "@/app/store/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AccountSliceState {
  id: number;
  name: string;
  balance: number;
  account_number: string;
  alias: string;
  cvu: string;
}

const initialState: AccountSliceState = {
  id: 0,
  name: "Gabriel Muller",
  balance: 123450.88,
  account_number: "10102",
  alias: "",
  cvu: "",
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
    fetchAccount: create.reducer(
      (state, action: PayloadAction<AccountSliceState>) => {
        state = {
          ...state,
          ...action.payload,
        };
      }
    ),
  }),
  selectors: {
    selectBalance: (account) => account.balance,
    selectAccountDetail: ({ name, account_number }) => ({
      name,
      account_number,
    }),
  },
});

export const { incrementBalance, decrementBalance } = accountSlice.actions;

export const { selectBalance, selectAccountDetail } = accountSlice.selectors;
