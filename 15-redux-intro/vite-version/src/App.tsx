import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { useAppSelector } from "./hooks";

function App() {
  const isCustomer = useAppSelector((store) =>
    store.customer.fullName ? true : false
  );
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {!isCustomer ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
