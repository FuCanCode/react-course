import { iPeople } from "../App/App";
import Button from "../Button/Button";
import "./people.css";

export default function People(props: {
  list: iPeople[];
  selectedPerson: number | null;
  onSelect: (id: number | null) => void;
}) {
  return (
    <ul>
      {props.list.map((p) => (
        <Card
          key={p.id}
          person={p}
          isSelected={p.id === props.selectedPerson}
          select={props.onSelect}
        />
      ))}
    </ul>
  );
}

function Card(props: {
  person: iPeople;
  isSelected: boolean;
  select: (id: number | null) => void;
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
    props.isSelected ? props.select(null) : props.select(props.person.id);
  }

  return (
    <li className="card">
      <img
        src={props.person.image}
        alt={`The portrait of ${props.person.name}`}
      />

      <h3>{props.person.name}</h3>
      {getDebtMessage()}
      <Button onClickHandler={handleClick}>
        {props.isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
