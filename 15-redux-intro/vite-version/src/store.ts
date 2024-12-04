import { createStore } from "redux";

interface Account {
  balance: number;
  loan: number;
  loanPurpose: string;
}

const initialState: Account = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

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

function reducer(
  state: Account = initialState,
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
}

export const store = createStore(reducer);

/* 
store.dispatch({ type: "account/deposit", payload: 500 });

console.log(store.getState());

store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 500, purpose: "Gulasch" },
});

console.log(store.getState());

store.dispatch({ type: "account/payLoan" });

console.log(store.getState()); */

function deposit(amount: number) {
  return {
    type: "account/deposit",
    payload: amount,
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

console.log(store.getState());

store.dispatch(deposit(7576));

console.log(store.getState());

store.dispatch(withdrawal(5656));

console.log(store.getState());

store.dispatch(requestLoan(1000, "Pleite"));

console.log(store.getState());

store.dispatch(payLoan());

console.log(store.getState());
