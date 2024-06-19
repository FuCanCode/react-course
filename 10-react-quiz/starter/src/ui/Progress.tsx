export interface ProgressProps {
  curQuestion: number;
  maxQuestions: number;
  curPoints: number;
  maxPoints: number;
  isAnswered: boolean;
}
export default function Progress(props: ProgressProps) {
  const { curQuestion, maxQuestions, curPoints, maxPoints, isAnswered } = props;

  return (
    <div className="progress">
      <progress
        max={maxQuestions}
        value={curQuestion + Number(isAnswered)}
      ></progress>
      <p>
        Question <strong>{curQuestion + 1}</strong>/{maxQuestions}
      </p>
      <p>
        <strong>{curPoints}</strong>/{maxPoints} points
      </p>
    </div>
  );
}
