interface ResultProps {
  points: number[];
  timeOver: boolean;
  onRestart: () => void;
}

function Result(props: ResultProps) {
  const [curPoints, maxPoints] = props.points;
  const percent = Math.round((curPoints / maxPoints) * 100);
  return (
    <div>
      <h2>{props.timeOver ? "Time is over!" : "All questions completed!"}</h2>
      <h2>
        You've finished with {curPoints} out of {maxPoints} ({percent}%) points!
      </h2>
      <button className="btn" onClick={() => props.onRestart()}>
        Restart
      </button>
    </div>
  );
}

export default Result;
