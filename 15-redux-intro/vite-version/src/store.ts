import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// Collects the reducers to send it as a whole to the store
const rootReducer = combineReducers({
  // property name = name of the store when accessed later (store.getState.[account/customer])
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);
export default store;
