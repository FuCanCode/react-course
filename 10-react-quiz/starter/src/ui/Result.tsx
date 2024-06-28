interface ResultProps {
  points: number[];
  timeOver: boolean;
  onRestart: () => void;
  highscore: number;
}

function Result(props: ResultProps) {
  const { highscore, onRestart, points, timeOver } = props;
  const [curPoints, maxPoints] = points;
  const percent = Math.round((curPoints / maxPoints) * 100);

  return (
    <div className="summary">
      <h2>{timeOver ? "Time is over!" : "All questions completed!"}</h2>
      <h3>
        You've finished with {curPoints} out of {maxPoints} ({percent}%) points!
      </h3>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button className="btn" onClick={() => onRestart()}>
        Restart
      </button>
    </div>
  );
}

export default Result;
