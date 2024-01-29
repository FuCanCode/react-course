import { useState } from "react";
import { IQuestion } from "./data";

export default function Accordion({ questions }: { questions: IQuestion[] }) {
  const [activePanel, setActivePanel] = useState<null | number>(null);

  return (
    <div className="accordion">
      {questions.map((q) => (
        <Panel
          key={q.id}
          title={q.title}
          number={q.id}
          clickHandler={setActivePanel}
          showText={activePanel === q.id}
        >
          {q.text}
        </Panel>
      ))}
    </div>
  );
}

function Panel({
  title,
  children,
  number,
  clickHandler,
  showText,
}: {
  title: string;
  children: string;
  number: number;
  clickHandler: (id: number | null) => void;
  showText: boolean;
}) {
  const leadingNumber: string = number < 10 ? `0${number}` : String(number + 1);

  function handleClick() {
    clickHandler(showText ? null : number);
  }

  return (
    <div className="panel">
      <span className="number">{leadingNumber}</span>
      <h3>{title}</h3>
      <div className="btn" onClick={handleClick}>
        {showText ? "-" : "+"}
      </div>
      <p
        className="answer"
        style={{
          maxHeight: showText ? "500px" : "0",
          overflow: "hidden",
          transition: "max-height 1.5s ease-in-out",
        }}
      >
        {showText ? children : ""}
      </p>
    </div>
  );
}
