import { useState } from "react";
import { QuizItem } from "../../data/useFakeApi";
import { QuizAction, QuizState } from "../../data/quizReducer";

interface QuestionProps {
  question: QuizItem;
  actions: (action: QuizAction) => QuizState;
}

export default function Question(props: QuestionProps) {
  const [isAnswered, setIsAnswered] = useState(false);

  const { question, options, correctOption, points } = props.question;

  const handleClickNext = () => props.actions({ type: "nextQuestion" });
  const handleClickOption = (points: number) => {
    setIsAnswered(true);
    props.actions({ type: "addPoints", pointsToAdd: points });
  };

  return (
    <>
      <h4>{question}</h4>
      <div className="options">
        {options.map((option, i) => {
          const isCorrectOption = correctOption === i;
          const answerClass = isCorrectOption ? "correct" : "wrong";

          return (
            <button
              key={option}
              disabled={isAnswered}
              className={`btn btn-option ${isAnswered ? answerClass : ""}`}
              onClick={() => handleClickOption(isCorrectOption ? points : 0)}
            >
              {option}
            </button>
          );
        })}
      </div>
      {isAnswered && (
        <button className="btn btn-ui" onClick={handleClickNext}>
          Next
        </button>
      )}
    </>
  );
}
