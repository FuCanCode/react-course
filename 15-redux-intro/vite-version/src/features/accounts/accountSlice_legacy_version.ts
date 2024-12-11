import { convertToUSD } from "./convertToUSD";
import { AppDispatch } from "../../store";

// TYPES /////////////
//////////////////////
interface Account {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
}

type AccountAction =
  | {
      type: "account/deposit";
      payload: number;
    }
  | {
      type: "account/withdrawal";
      payload: number;
    }
  | {
      type: "account/requestLoan";
      payload: {
        amount: number;
        purpose: string;
      };
    }
  | {
      type: "account/payLoan";
    }
  | {
      type: "account/covertingCurrency";
    };

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
function accountReducer(
  state: Account | undefined = initialStateAccount,
  action: AccountAction
): Account {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    case "account/withdrawal":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    case "account/covertingCurrency":
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }

  // ACTION CREATORS ////
  ///////////////////////
} // so called action creators that wraps the actions in more comfortable format
function deposit(amount: number, currency: string) {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
      // need to use "as const", otherwise TS would infer the type of the type prop
      // just as "string" but not as "account/deposit" in this case
    } as const;

  /// WORKING WITH THUNKS ///
  //////////////////////////
  // returning a function shows redux that an async/middleware operation is coming
  //
  // Genreal shape:
  // const thunkFunction = (dispatch, getState) => {
  //   // logic here that can dispatch actions or read state
  // }
  // store.dispatch(thunkFunction) instead of an action type

  return async function (dispatch: AppDispatch) {
    dispatch(covertingCurrency());
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const convertedValue = await convertToUSD(amount, currency);

    dispatch(deposit(convertedValue, "USD"));
  };
}

function withdrawal(amount: number) {
  return {
    type: "account/withdrawal",
    payload: amount,
  } as const;
}

function requestLoan(amount: number, purpose: string) {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      purpose,
    },
  } as const;
}

function payLoan() {
  return {
    type: "account/payLoan",
  } as const;
}

function covertingCurrency() {
  return {
    type: "account/covertingCurrency",
  } as const;
}

export default accountReducer;
export { deposit, withdrawal, payLoan, requestLoan, type Account };
