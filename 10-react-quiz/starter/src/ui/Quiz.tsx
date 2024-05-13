import { QuizItem } from "../../data/useFakeApi";
import Progress, { ProgressProps } from "./Progress";
import Question from "./Question";

interface QuizProps {
  quizItem: QuizItem;
  progress: ProgressProps;
}

function Quiz(props: QuizProps) {
  const curQuestion = props.quizItem;

  return (
    <div>
      <Progress {...props.progress} />
      <Question question={curQuestion} />
    </div>
  );
}

export default Quiz;
