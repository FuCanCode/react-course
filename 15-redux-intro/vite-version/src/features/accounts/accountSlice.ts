import { convertToUSD } from "./convertToUSD";
import { AppThunk } from "../../store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// TYPES /////////////
//////////////////////
export interface Account {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
}

// INITIAL STATE //
///////////////////
const initialStateAccount: Account = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

// REDUCER //////
/////////////////
export const accountSlice = createSlice({
  name: "account",
  initialState: initialStateAccount,
  reducers: {
    deposit: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
      state.isLoading = false;
    },

    load: (state) => {
      state.isLoading = true;
    },

    withdrawal: (state, action: PayloadAction<number>) => {
      state.balance -= action.payload;
    },

    payLoan: (state) => {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },

    requestLoan: {
      prepare: (amount: number, purpose: string) => {
        return { payload: { amount, purpose } };
      },
      reducer: (
        state,
        action: PayloadAction<{ amount: number; purpose: string }>
      ) => {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.balance += action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
  },
});

const asyncDeposit = (amount: number, currency: string): AppThunk => {
  return async (dispatch) => {
    if (currency === "USD") {
      dispatch(accountSlice.actions.deposit(amount));
    } else {
      dispatch(accountSlice.actions.load());
      const convertedValue = await convertToUSD(amount, currency);
      dispatch(accountSlice.actions.deposit(convertedValue));
    }
  };
};
export { asyncDeposit as deposit };

export default accountSlice.reducer;
export const { payLoan, withdrawal, requestLoan } = accountSlice.actions;
