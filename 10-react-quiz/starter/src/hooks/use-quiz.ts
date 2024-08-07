import { useContext } from "react";
import { QuizContext } from "../context/quiz-context";

export function useQuiz() {
  const context = useContext(QuizContext);

  if (!context) throw Error("No access to QuizContextProvider");

  return context;
}
