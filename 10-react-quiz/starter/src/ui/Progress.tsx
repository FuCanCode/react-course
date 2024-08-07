import { useQuiz } from "../hooks/use-quiz";

export default function Progress() {
  const { currentQuestion, questions, points, getMaxPoints, answer } =
    useQuiz();

  return (
    <div className="progress">
      <progress
        max={questions.length}
        value={currentQuestion + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{currentQuestion + 1}</strong>/{questions.length}
      </p>
      <p>
        <strong>{points}</strong>/{getMaxPoints()} points
      </p>
    </div>
  );
}
