import { QuizAction, QuizState } from "../../data/quizReducer";
import { QuizItem } from "../../data/useFakeApi";
import Progress, { ProgressProps } from "./Progress";
import Question from "./Question";
import Result from "./Result";

interface QuizProps {
  quizItem: QuizItem;
  progress: ProgressProps;
  actions: (action: QuizAction) => QuizState;
}

function Quiz(props: QuizProps) {
  const curQuizItem = props.quizItem;

  const { curPoints, maxPoints, curQuestion, maxQuestions } = props.progress;
  const isFinished = curQuestion === maxQuestions;

  if (isFinished) return <Result points={[curPoints, maxPoints]} />;

  return (
    <div>
      <Progress {...props.progress} />
      <Question
        key={curQuizItem.id}
        question={curQuizItem}
        actions={props.actions}
      />
    </div>
  );
}

export default Quiz;
