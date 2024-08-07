import { QuizAction, QuizItem } from "../../data/quizReducer";

function Options(props: {
  question: QuizItem;
  actions: React.Dispatch<QuizAction>;
  answer: number | null;
}) {
  const { actions, answer } = props;
  const { options, correctOption, points } = props.question;

  const handleClickOption = (points: number, index: number) => {
    actions({ type: "newAnswer", answer: index });
    actions({ type: "addPoints", pointsToAdd: points });
  };
  return (
    <div className="options">
      {options.map((option, i) => {
        const isCorrectOption = correctOption === i;
        const answered = answer !== null;
        const answerClass = `${isCorrectOption ? "correct" : "wrong"} ${
          answer === i ? "answer" : ""
        }`;

        return (
          <button
            key={option}
            disabled={answered}
            className={`btn btn-option ${answered ? answerClass : ""}`}
            onClick={() => handleClickOption(isCorrectOption ? points : 0, i)}
            value={i}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
