// TYPES /////////////
//////////////////////
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

// INITIAL STATE //
///////////////////
const initialStateCustomer: Customer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// REDUCER //////
/////////////////
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

// ACTION CREATORS ////
///////////////////////
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

export default customerReducer;
export { createCustomer, updateName };
