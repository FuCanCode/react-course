import { useQuiz } from "../hooks/use-quiz";

function Result() {
  const { getMaxPoints, points, highscore, timeLeft, restartQuiz } = useQuiz();

  const maxPoints = getMaxPoints();
  const timeOver = timeLeft <= 0;
  const percent = Math.round((points / maxPoints) * 100);

  return (
    <div className="summary">
      <h2>{timeOver ? "Time is over!" : "All questions completed!"}</h2>
      <h3>
        You've finished with {points} out of {maxPoints} ({percent}%) points!
      </h3>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button className="btn" onClick={restartQuiz}>
        Restart
      </button>
    </div>
  );
}

export default Result;
