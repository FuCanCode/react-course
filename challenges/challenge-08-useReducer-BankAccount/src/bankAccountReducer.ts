export interface AccountState {
  balance: number;
  loan: number;
  isActive: boolean;
}

export type AccountAction =
  | { type: "openAccount" }
  | { type: "deposit"; payload: number }
  | { type: "withdraw"; payload: number }
  | { type: "requestLoan"; payload: number }
  | { type: "payLoan" }
  | { type: "closeAccount" };

export function bankAccountReducer(state: AccountState, action: AccountAction) {
  if (!state.isActive && action.type !== "openAccount") return state;

  switch (action.type) {
    case "openAccount":
      return { ...state, isActive: true, balance: 500 };
    case "deposit":
      return { ...state, balance: state.balance + action.payload };

    case "withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "requestLoan":
      if (state.loan) {
        return state;
      } else {
        return {
          ...state,
          balance: state.balance + action.payload,
          loan: action.payload,
        };
      }

    case "payLoan":
      return state.loan
        ? { ...state, balance: state.balance - state.loan, loan: 0 }
        : state;

    case "closeAccount":
      return state.balance === 0 && !state.loan
        ? { ...state, isActive: false }
        : state;

    default:
      throw new Error("Unknown action");
  }
}
