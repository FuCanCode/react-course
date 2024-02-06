import { useState } from "react";
import { iPeople } from "../App/App";
import Button from "../Button/Button";
import "./billForm.css";

interface BillFormProps {
  debtor: iPeople;
  onSplitBill: (param: iPeople) => void;
}

export default function BillForm(props: BillFormProps) {
  const [billInput, setBillInput] = useState<string>("");
  const [isOwnBill, setIsOwnBill] = useState(true);
  const [activeInput, setActiveInput] = useState<string>("");

  const bill = Number(billInput);
  const lockedInput = Number(billInput) - Number(activeInput);

  function handleSplitSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const zeroBalance = bill / 2;
    const debt: number =
      zeroBalance - (isOwnBill ? lockedInput : Number(activeInput));

    const updatedDebtor: iPeople = {
      ...props.debtor,
      balance: props.debtor.balance + debt,
    };
    props.onSplitBill(updatedDebtor);

    setActiveInput("");
    setBillInput("");
  }

  return (
    <div className="bill">
      <h1>Split a Bill with {props.debtor.name}</h1>
      <form>
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
          disabled={!isOwnBill}
          value={!isOwnBill ? lockedInput : activeInput}
          onChange={(e) => setActiveInput(e.target.value)}
        />
        <label htmlFor="other">🫵 {props.debtor.name}'s expense</label>
        <input
          type="text"
          name="other"
          disabled={isOwnBill}
          value={isOwnBill ? lockedInput : activeInput}
          onChange={(e) => setActiveInput(e.target.value)}
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
        <Button eventHandler={handleSplitSubmit}>Split Bill</Button>
      </form>
    </div>
  );
}
