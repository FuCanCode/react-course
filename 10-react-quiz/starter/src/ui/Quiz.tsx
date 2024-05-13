import { QuizItem } from "../../data/useFakeApi";

interface QuizProps {
  quizItem: QuizItem;
  progress: ProgressProps;
}

function Quiz(props: QuizProps) {
  const { question } = props.quizItem;

  return (
    <div>
      <Progress {...props.progress} />
    </div>
  );
}

export interface ProgressProps {
  curQuestion: number;
  maxQuestions: number;
  curPoints: number;
  maxPoints: number;
}

function Progress(props: ProgressProps) {
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

export default Quiz;
