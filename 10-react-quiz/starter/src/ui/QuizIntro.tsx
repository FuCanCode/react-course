import { useQuiz } from "../hooks/use-quiz";

function QuizIntro() {
  const { questions, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questions.length} questions to test your React mastery</h3>
      <button className="btn" onClick={() => dispatch({ type: "startGame" })}>
        Let's start
      </button>
    </div>
  );
}

export default QuizIntro;
