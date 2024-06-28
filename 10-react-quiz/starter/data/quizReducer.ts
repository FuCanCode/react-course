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
  answer: number | null;
  points: number;
  timeLeft: number | null;
  highscore: number;
}
export type QuizAction =
  | { type: "startGame" }
  | { type: "setQuestions"; questions: QuizItem[] }
  | { type: "error" }
  | { type: "newAnswer"; answer: number }
  | { type: "addPoints"; pointsToAdd: number }
  | { type: "nextQuestion" }
  | { type: "timerTick" }
  | { type: "finish" }
  | { type: "restart"; defaultState: QuizState };

const SECONDS_PER_QUESTION = 20;

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "startGame":
      return {
        ...state,
        status: "active",
        timeLeft: state.questions.length * SECONDS_PER_QUESTION,
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
        answer: null,
      };

    case "newAnswer":
      return { ...state, answer: action.answer };

    case "addPoints":
      return {
        ...state,
        points: state.points + action.pointsToAdd,
      };

    case "timerTick":
      return {
        ...state,
        timeLeft: Number(state.timeLeft) > 0 ? Number(state.timeLeft) - 1 : 0,
        status: Number(state.timeLeft) > 0 ? "active" : "finished",
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...action.defaultState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };

    default:
      throw new Error("Unknown action");
  }
}
