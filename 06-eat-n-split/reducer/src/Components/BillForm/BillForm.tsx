import { Dispatch, useState } from "react";
import { iPeople, SplittedBill } from "../../reducer/ensReducer";
import Button from "../Button/Button";
import "./billForm.css";

interface BillFormProps {
  debtor: iPeople;
  dispatch: Dispatch<SplittedBill>;
}

export default function BillForm(props: BillFormProps) {
  const [billInput, setBillInput] = useState<string>("");
  const [isOwnBill, setIsOwnBill] = useState(true);
  const [ownExpenseInput, setOwnExpenseInput] = useState<string>("");

  const bill = Number(billInput);
  const ownExpense = Number(ownExpenseInput);
  const debtorValue = bill - ownExpense;

  function handleSplitSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!bill) return;

    const value = isOwnBill ? debtorValue : -ownExpense;

    props.dispatch({ type: "splitted_bill", bill: value });

    setOwnExpenseInput("");
    setBillInput("");
  }

  function checkValidInput(input: string): string {
    return Number(input) > Number(billInput) ? ownExpenseInput : input;
  }

  return (
    <div className="bill">
      <h1>Split a Bill with {props.debtor.name}</h1>

      <form onSubmit={handleSplitSubmit}>
        <label htmlFor="bill">💰 Bill value</label>
        <input
          type="text"
          name="bill"
          value={billInput}
          onChange={(e) => setBillInput(e.target.value)}
        />

        <label htmlFor="own">🫰 Your expense</label>
        <input
          type="text"
          name="own"
          value={ownExpenseInput}
          onChange={(e) => setOwnExpenseInput(checkValidInput(e.target.value))}
        />

        <label htmlFor="other">🫵 {props.debtor.name}'s expense</label>
        <input
          type="text"
          name="other"
          disabled
          value={debtorValue}
          onChange={(e) => setOwnExpenseInput(checkValidInput(e.target.value))}
        />

        <label htmlFor="decide">❓ Who is paying the bill?</label>
        <select
          name="decide"
          value={isOwnBill ? "own" : "other"}
          onChange={() => setIsOwnBill(!isOwnBill)}
        >
          <option value="own">You</option>
          <option value="other">{props.debtor.name}</option>
        </select>

        <Button>Split Bill</Button>
      </form>
    </div>
  );
}
