import { useState } from "react";
import { QuizItem } from "../../data/quizReducer";
import { QuizAction } from "../../data/quizReducer";
import Timer from "./Timer";

interface QuestionProps {
  question: QuizItem;
  actions: React.Dispatch<QuizAction>;
  timeLeft: number;
}

export default function Question(props: QuestionProps) {
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const { question, options, correctOption, points } = props.question;

  const handleClickNext = () => props.actions({ type: "nextQuestion" });
  const handleClickOption = (points: number, index: number) => {
    setIsAnswered(true);
    setSelectedAnswer(index);
    props.actions({ type: "addPoints", pointsToAdd: points });
  };

  return (
    <>
      <h4>{question}</h4>
      <div className="options">
        {options.map((option, i) => {
          const isCorrectOption = correctOption === i;
          const answerClass = `${isCorrectOption ? "correct" : "wrong"} ${
            selectedAnswer === i ? "answer" : ""
          }`;

          return (
            <button
              key={option}
              disabled={isAnswered}
              className={`btn btn-option ${isAnswered ? answerClass : ""}`}
              onClick={() => handleClickOption(isCorrectOption ? points : 0, i)}
              value={i}
            >
              {option}
            </button>
          );
        })}
      </div>
      <Timer secondsLeft={props.timeLeft} tickAction={props.actions} />
      {isAnswered && (
        <button className="btn btn-ui" onClick={handleClickNext}>
          Next
        </button>
      )}
    </>
  );
}
