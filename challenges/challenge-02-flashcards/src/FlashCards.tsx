import { useState } from "react";
import { questions, ICard } from "./cardsData";

export default function FlashCards() {
  const [activeID, setActiveID] = useState<number | null>(null);

  function handleClick(id: number) {
    setActiveID(id === activeID ? null : id);
  }

  const containerStyles: React.CSSProperties = {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  return (
    <div className="cards-container" style={containerStyles}>
      {questions.map((card: ICard) => (
        <Card
          key={card.id}
          {...card}
          activeID={activeID}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
}

function Card({
  id,
  question,
  answer,
  activeID,
  handleClick,
}: {
  id: number;
  question: string;
  answer: string;
  activeID: number | null;
  handleClick: (id: number) => void;
}) {
  const isActive = id === activeID;
  const content = isActive ? answer : question;

  const cardStyle: React.CSSProperties = {
    backgroundColor: isActive ? "green" : "orangered",
    height: "10rem",
    width: "18rem",
    border: "2px solid white",
    borderRadius: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
    cursor: "pointer",
  };

  return (
    <div className="card" style={cardStyle} onClick={() => handleClick(id)}>
      <h2>{content}</h2>
    </div>
  );
}
