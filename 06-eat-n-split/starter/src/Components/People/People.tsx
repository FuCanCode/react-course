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
    <div className="card">
      <img
        src={props.person.image}
        alt={`The portrait of ${props.person.name}`}
      />
      <div>
        <h2>{props.person.name}</h2>
        <p>TBA {props.person.balance}</p>
      </div>
      <Button>TBA</Button>
    </div>
  );
}
