import { useState } from "react";
import { IQuestion } from "./data";

export default function Accordion({ questions }: { questions: IQuestion[] }) {
  return (
    <div className="accordion">
      {questions.map((q) => (
        <Panel key={q.id} title={q.title} text={q.text} number={q.id} />
      ))}
    </div>
  );
}

function Panel({
  title,
  text,
  number,
}: {
  title: string;
  text: string;
  number: number;
}) {
  const [showText, setShowText] = useState(false);

  const leadingNumber: string = number < 10 ? `0${number}` : String(number + 1);
  return (
    <div className="panel">
      <span className="number">{leadingNumber}</span>
      <h3>{title}</h3>
      <div className="btn" onClick={() => setShowText(!showText)}>
        {showText ? "-" : "+"}
      </div>
      <p className="answer">{showText ? text : ""}</p>
    </div>
  );
}
