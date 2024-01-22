import { useState } from "react";
import { IQuestion } from "./data";

export default function Accordion({ questions }: { questions: IQuestion[] }) {
  return (
    <div className="accordion">
      {questions.map((q) => (
        <Panel key={q.id} title={q.title} text={q.text} />
      ))}
    </div>
  );
}

function Panel({ title, text }: { title: string; text: string }) {
  const [showText, setShowText] = useState(false);
  return (
    <div className="panel">
      <h3>
        {title} <span onClick={() => setShowText(!showText)}>⌄</span>
      </h3>
      {showText && <p>{text}</p>}
    </div>
  );
}
