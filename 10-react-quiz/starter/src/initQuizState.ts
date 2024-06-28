import { QuizState } from "../data/quizReducer";

export const initQuizState: QuizState = {
  questions: [],
  status: "loading",
  currentQuestion: 0,
  answer: null,
  points: 0,
  timeLeft: null,
  highscore: 0,
};
