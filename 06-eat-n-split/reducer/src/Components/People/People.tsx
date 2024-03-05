import { iPeople, SelectedFriend } from "../../reducer/ensReducer";
import Button from "../Button/Button";
import "./people.css";
import {
  useAppStateContext,
  useAppDispatchContext,
} from "../../context/AppProvider";

export default function People() {
  const state = useAppStateContext();

  return (
    <>
      {state.error && <h1>Error: {state.error}</h1>}
      <ul>
        {state.friends.map((p) => (
          <Card
            key={p.id}
            person={p}
            isSelected={p.id === state.selectedFriend}
          />
        ))}
      </ul>
    </>
  );
}

type CardProps = {
  person: iPeople;
  isSelected: boolean;
};

function Card({ person, isSelected }: CardProps) {
  const dispatch: React.Dispatch<SelectedFriend> = useAppDispatchContext();

  const getDebtMessage = function () {
    if (person.balance < 0)
      return (
        <p style={{ color: "red" }}>
          You owe {person.name} {Math.abs(person.balance)}€
        </p>
      );
    if (person.balance > 0)
      return (
        <p style={{ color: "green" }}>
          {person.name} owes you {person.balance}€
        </p>
      );

    if (person.balance === 0) return <p>You and {person.name} are even</p>;
  };

  function handleClick() {
    dispatch({
      type: "selected_friend",
      selectedFriendId: isSelected ? null : person.id,
    });
  }

  return (
    <li className={isSelected ? "card selected" : "card"}>
      <img src={person.image} alt={`The portrait of ${person.name}`} />

      <h3>{person.name}</h3>
      {getDebtMessage()}
      <Button eventHandler={handleClick}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
