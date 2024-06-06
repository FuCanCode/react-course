export interface QuizItem {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}
export interface QuizState {
  questions: QuizItem[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  currentQuestion: number;
  points: number;
  timeLeft: number;
}
export type QuizAction =
  | { type: "startGame" }
  | { type: "setQuestions"; questions: QuizItem[] }
  | { type: "error" }
  | { type: "nextQuestion" }
  | { type: "addPoints"; pointsToAdd: number }
  | { type: "timerTick" }
  | { type: "restart"; defaultState: QuizState };

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "startGame":
      return {
        ...state,
        status: "active",
      };

    case "setQuestions":
      return {
        ...state,
        questions: action.questions,
        status: "ready",
      };

    case "error":
      return {
        ...state,
        status: "error",
      };

    case "nextQuestion":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      };

    case "addPoints":
      return {
        ...state,
        points: state.points + action.pointsToAdd,
      };

    case "timerTick":
      return {
        ...state,
        timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0,
        status: state.timeLeft > 0 ? "active" : "finished",
      };

    case "restart":
      return { ...action.defaultState };

    default:
      throw new Error("Unknown action");
  }
}
