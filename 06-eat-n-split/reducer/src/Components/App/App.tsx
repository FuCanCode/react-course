import { useReducer } from "react";
import BillForm from "../BillForm/BillForm";
import People from "../People/People";
import "./app.css";
import AddFriend from "../AddFriend/AddFriend";
import { AppState, iPeople, eNsReducer } from "../../reducer/ensReducer";

const initialFriends: iPeople[] = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const initialState: AppState = {
  selectedFriend: null,
  friends: initialFriends,
  error: null,
};

function App() {
  const [state, dispatch] = useReducer(eNsReducer, initialState);

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
    <div className="app">
      {state.error && <h1>Error: {state.error}</h1>}
      <div className="left">
        <People
          list={state.friends}
          selectedPerson={state.selectedFriend}
          dispatch={dispatch}
        />

        <AddFriend dispatch={dispatch} />

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
      </div>

      {state.selectedFriend && (
        <BillForm
          key={state.selectedFriend}
          debtor={
            state.friends.find((debtor) => debtor.id === state.selectedFriend)!
          }
          dispatch={dispatch}
        />
      )}
    </div>
  );
}

export default App;
