import { iPeople, SelectedFriend } from "../../reducer/ensReducer";
import Button from "../Button/Button";
import "./people.css";

export default function People(props: {
  list: iPeople[];
  selectedPerson: number | null;
  dispatch: React.Dispatch<SelectedFriend>;
}) {
  return (
    <ul>
      {props.list.map((p) => (
        <Card
          key={p.id}
          person={p}
          isSelected={p.id === props.selectedPerson}
          dispatch={props.dispatch}
        />
      ))}
    </ul>
  );
}

function Card(props: {
  person: iPeople;
  isSelected: boolean;
  dispatch: React.Dispatch<SelectedFriend>;
}) {
  const getDebtMessage = function () {
    if (props.person.balance < 0)
      return (
        <p style={{ color: "red" }}>
          You owe {props.person.name} {Math.abs(props.person.balance)}€
        </p>
      );
    if (props.person.balance > 0)
      return (
        <p style={{ color: "green" }}>
          {props.person.name} owes you {props.person.balance}€
        </p>
      );

    if (props.person.balance === 0)
      return <p>You and {props.person.name} are even</p>;
  };

  function handleClick() {
    props.dispatch({
      type: "selected_friend",
      selectedFriendId: props.isSelected ? null : props.person.id,
    });
  }

  return (
    <li className={props.isSelected ? "card selected" : "card"}>
      <img
        src={props.person.image}
        alt={`The portrait of ${props.person.name}`}
      />

      <h3>{props.person.name}</h3>
      {getDebtMessage()}
      <Button eventHandler={handleClick}>
        {props.isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
