import { useQuiz } from "../hooks/use-quiz";
import Options from "./Options";

export default function Question() {
  const { getCurrentQuestion } = useQuiz();

  return (
    <>
      <h4>{getCurrentQuestion().question}</h4>
      <Options />
    </>
  );
}
