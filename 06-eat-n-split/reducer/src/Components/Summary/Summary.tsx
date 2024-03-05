import { useAppStateContext } from "../../context/AppProvider";
import { iPeople } from "../../reducer/ensReducer";

export default function Summary() {
  const state = useAppStateContext();

  const debts: number = state.friends.reduce(
    (sum: number, cur: iPeople): number => {
      return cur.balance < 0 ? sum + cur.balance : sum;
    },
    0
  );
  const credit = state.friends.reduce(
    (sum, cur) => (cur.balance > 0 ? sum + cur.balance : sum),
    0
  );
  const balance = debts + credit;

  return (
    <div className="summary">
      <p>
        Debts: <span className="red">{debts}€</span>
      </p>
      <p>
        Credits: <span className="green">{credit}€</span>
      </p>
      <p>
        Balance:{" "}
        <span className={balance > 0 ? "green" : balance < 0 ? "red" : ""}>
          {balance}€
        </span>
      </p>
    </div>
  );
}
