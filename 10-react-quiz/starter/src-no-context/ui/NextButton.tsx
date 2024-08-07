import { QuizAction } from "../../data/quizReducer";

interface NextButtonProps {
  dispatch: React.Dispatch<QuizAction>;
  isVisible: boolean;
  isLastQuestion: boolean;
}

function NextButton(props: NextButtonProps) {
  const { dispatch, isVisible, isLastQuestion } = props;

  if (!isVisible) return null;

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
