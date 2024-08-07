import { useQuiz } from "../hooks/use-quiz";

function NextButton() {
  const { dispatch, currentQuestion, questions } = useQuiz();

  const isLastQuestion = currentQuestion + 1 === questions.length;

  const buttonText = isLastQuestion ? "Finish" : "Next";

  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({ type: isLastQuestion ? "finish" : "nextQuestion" })
      }
    >
      {buttonText}
    </button>
  );
}

export default NextButton;
