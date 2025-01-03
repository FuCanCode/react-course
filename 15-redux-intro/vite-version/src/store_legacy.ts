import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";

import accountReducer, { deposit } from "./features/accounts/accountSlice";
import customerReducer, {
  createCustomer,
} from "./features/customers/customerSlice";
import { composeWithDevTools } from "@redux-devtools/extension";

// Collects the reducers to send it as a whole to the store
const rootReducer = combineReducers({
  // property name = name of the store when accessed later (store.getState.[account/customer])
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;

store.dispatch(createCustomer("Jonas Schmedtmann", "24343434"));
store.dispatch(deposit(250, "USD"));

// https://redux.js.org/tutorials/typescript-quick-start
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
