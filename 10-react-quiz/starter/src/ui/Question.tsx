import { useState } from "react";
import { QuizItem } from "../../data/useFakeApi";

interface QuestionProps {
  question: QuizItem;
}

export default function Question(props: QuestionProps) {
  const [isAnswered, setIsAnswered] = useState(true);

  const { question, options, correctOption } = props.question;

  return (
    <>
      <h4>{question}</h4>
      <div className="options">
        {options.map((option, i) => {
          const answerClass = correctOption === i ? "correct" : "wrong";

          return (
            <button
              key={option}
              disabled={isAnswered}
              className={`btn btn-option ${isAnswered ? answerClass : ""}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </>
  );
}
