import { combineReducers, createStore } from "redux";

interface Account {
  balance: number;
  loan: number;
  loanPurpose: string;
}

const initialStateAccount: Account = {
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
}

interface Customer {
  fullName: string;
  nationalID: string;
  createdAt: string;
}

type CustomerAction =
  | {
      type: "customer/createCustomer";
      payload: { fullName: string; nationalID: string; createdAt: string };
    }
  | { type: "customer/updateName"; payload: string };

const initialStateCustomer: Customer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function customerReducer(
  state: Customer = initialStateCustomer,
  action: CustomerAction
): Customer {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
}

// Collects the reducers to send it as a whole to the store
const rootReducer = combineReducers({
  // property name = name of the store when accessed later (store.getState.[account/customer])
  account: accountReducer,
  customer: customerReducer,
});

export const store = createStore(rootReducer);

// so called action creators that wraps the actions in more comfortable format
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

console.log(store.getState().account);
store.dispatch(deposit(7576));
console.log(store.getState().account);
store.dispatch(withdrawal(5656));
console.log(store.getState().account);
store.dispatch(requestLoan(1000, "Pleite"));
console.log(store.getState().account);
store.dispatch(payLoan());
console.log(store.getState().account);

function createCustomer(fullName: string, nationalID: string) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  } as const;
}

function updateName(newName: string) {
  return {
    type: "customer/updateName",
    payload: newName,
  } as const;
}

store.dispatch(createCustomer("Bernd", "ID0815"));
console.log(store.getState().customer);
store.dispatch(updateName("Mike"));
console.log(store.getState().customer);
