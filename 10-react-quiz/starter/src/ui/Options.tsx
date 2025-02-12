import { useQuiz } from "../hooks/use-quiz";

function Options() {
  const { dispatch, answer, getCurrentQuestion } = useQuiz();

  const { options, correctOption, points } = getCurrentQuestion();

  const handleClickOption = (points: number, index: number) => {
    dispatch({ type: "newAnswer", answer: index });
    dispatch({ type: "addPoints", pointsToAdd: points });
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
