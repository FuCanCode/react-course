import { iPeople } from "../App/App";
import Button from "../Button/Button";
import "./people.css";

export default function People(props: { list: iPeople[] }) {
  return (
    <ul>
      {props.list.map((p) => (
        <Card key={p.id} person={p} />
      ))}
    </ul>
  );
}

function Card(props: { person: iPeople }) {
  return (
    <li className="card">
      <img
        src={props.person.image}
        alt={`The portrait of ${props.person.name}`}
      />

      <h3>{props.person.name}</h3>
      <p>TBA {props.person.balance}</p>

      <Button>TBA</Button>
    </li>
  );
}
