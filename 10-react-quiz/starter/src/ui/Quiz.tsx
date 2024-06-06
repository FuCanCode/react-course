import { QuizAction } from "../../data/quizReducer";
import { QuizItem } from "../../data/quizReducer";
import { initQuizState } from "../initQuizState";
import Progress, { ProgressProps } from "./Progress";
import Question from "./Question";
import Result from "./Result";

interface QuizProps {
  quizItem: QuizItem;
  progress: ProgressProps;
  actions: React.Dispatch<QuizAction>;
  timeLeft: number;
}

function Quiz(props: QuizProps) {
  const curQuizItem = props.quizItem;

  const { curPoints, maxPoints, curQuestion, maxQuestions } = props.progress;
  const timeIsOver = props.timeLeft === 0;
  const isFinished = curQuestion === maxQuestions;

  if (isFinished || timeIsOver)
    return (
      <Result
        points={[curPoints, maxPoints]}
        timeOver={timeIsOver}
        onRestart={() =>
          props.actions({ type: "restart", defaultState: initQuizState })
        }
      />
    );

  return (
    <div>
      <Progress {...props.progress} />
      <Question
        key={curQuizItem.id}
        question={curQuizItem}
        actions={props.actions}
        timeLeft={props.timeLeft}
      />
    </div>
  );
}

export default Quiz;
