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
      payload: number;
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
      return { ...state, loan: action.payload };
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
