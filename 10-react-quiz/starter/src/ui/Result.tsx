interface ResultProps {
  points: number[];
}

function Result(props: ResultProps) {
  const [curPoints, maxPoints] = props.points;
  const percent = Math.round((curPoints / maxPoints) * 100);
  return (
    <div>
      <h2>
        You've finished with {curPoints} out of {maxPoints} ({percent}%) points!
      </h2>
    </div>
  );
}

export default Result;
