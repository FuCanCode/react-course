import { useAppSelector } from "../../hooks";

function Customer() {
  // You can and should select the properties in need really fine grained
  // and build sql-like SELECT statements
  const customer = useAppSelector((state) => state.customer.fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
