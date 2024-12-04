// TYPES /////////////
//////////////////////
interface Account {
  balance: number;
  loan: number;
  loanPurpose: string;
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
    };

// INITIAL STATE //
///////////////////
const initialStateAccount: Account = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// REDUCER //////
/////////////////
function accountReducer(
  state: Account = initialStateAccount,
  action: AccountAction
): Account {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

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
    default:
      return state;
  }

  // ACTION CREATORS ////
  ///////////////////////
} // so called action creators that wraps the actions in more comfortable format
function deposit(amount: number) {
  return {
    type: "account/deposit",
    payload: amount,
    // need to use "as const", otherwise TS would infer the type of the type prop
    // just as "string" but not as "account/deposit" in this case
  } as const;
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

export default accountReducer;
export { deposit, withdrawal, payLoan, requestLoan };
