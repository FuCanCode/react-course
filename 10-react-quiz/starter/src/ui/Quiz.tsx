import { QuizItem } from "../../data/useFakeApi";
import Progress, { ProgressProps } from "./Progress";
import Question from "./Question";
import Result from "./Result";

interface QuizProps {
  quizItem: QuizItem;
  progress: ProgressProps;
}

function Quiz(props: QuizProps) {
  const curQuizItem = props.quizItem;

  const { curPoints, maxPoints, curQuestion, maxQuestions } = props.progress;
  const isFinished = curQuestion === maxQuestions;

  if (isFinished) return <Result points={[curPoints, maxPoints]} />;

  return (
    <div>
      <Progress {...props.progress} />
      <Question question={curQuizItem} />
    </div>
  );
}

export default Quiz;
