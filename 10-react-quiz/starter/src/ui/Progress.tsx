export interface ProgressProps {
  curQuestion: number;
  maxQuestions: number;
  curPoints: number;
  maxPoints: number;
}
export default function Progress(props: ProgressProps) {
  const { curQuestion, maxQuestions, curPoints, maxPoints } = props;

  return (
    <div className="progress">
      <progress max={maxQuestions} value={curQuestion}></progress>
      <p>
        Question {curQuestion}/{maxQuestions}
      </p>
      <p>
        {curPoints}/{maxPoints} points
      </p>
    </div>
  );
}
