// component is about a legacy way of connecting redux state with react components

import { connect } from "react-redux";
import { Account } from "./accountSlice";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }: { balance?: number }) {
  return <div className="balance">{formatCurrency(balance!)}</div>;
}

function mapStateToProps(state: { account: Account }) {
  return {
    balance: state.account.balance,
  };
}

export default connect(mapStateToProps)(BalanceDisplay);
