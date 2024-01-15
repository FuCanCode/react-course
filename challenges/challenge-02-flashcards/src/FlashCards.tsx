import { useState } from "react";
import { questions, ICard } from "./cardsData";

export default function FlashCards() {
  const containerStyles: React.CSSProperties = {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  return (
    <div className="cards-container" style={containerStyles}>
      {questions.map((card: ICard) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
}

function Card({ question, answer }: { question: string; answer: string }) {
  const [isAnswer, setIsAnswer] = useState(false);

  const content = isAnswer ? answer : question;

  const cardStyle: React.CSSProperties = {
    backgroundColor: isAnswer ? "green" : "orangered",
    height: "10rem",
    width: "18rem",
    border: "2px solid white",
    borderRadius: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
  };

  return (
    <div
      className="card"
      style={cardStyle}
      onClick={() => setIsAnswer(!isAnswer)}
    >
      <h2>{content}</h2>
    </div>
  );
}
