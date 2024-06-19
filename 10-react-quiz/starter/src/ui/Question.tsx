import { QuizItem } from "../../data/quizReducer";
import { QuizAction } from "../../data/quizReducer";
import Options from "./Options";
import Timer from "./Timer";

interface QuestionProps {
  question: QuizItem;
  actions: React.Dispatch<QuizAction>;
  timeLeft: number;
  answer: number | null;
}

export default function Question(props: QuestionProps) {
  const { question, actions, answer, timeLeft } = props;
  const questionText = question.question;

  return (
    <>
      <h4>{questionText}</h4>
      <Options question={question} actions={actions} answer={answer} />
      <Timer secondsLeft={timeLeft} tickAction={actions} />
    </>
  );
}
