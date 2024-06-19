import { QuizState } from "../data/quizReducer";

const defaultQuizMinutes = 5;

export const initQuizState: QuizState = {
  questions: [],
  status: "loading",
  currentQuestion: 0,
  answer: null,
  points: 0,
  timeLeft: defaultQuizMinutes * 60,
};
