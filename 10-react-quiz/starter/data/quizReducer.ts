export interface QuizState {
  currentQuestion: number;
  points: number;
  isStarted: boolean;
  timeLeft: number;
}
export type QuizAction =
  | { type: "startGame" }
  | { type: "nextQuestion" }
  | { type: "addPoints"; pointsToAdd: number }
  | { type: "timerTick" }
  | { type: "restart"; defaultState: QuizState };

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "startGame":
      return {
        ...state,
        isStarted: true,
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
      };

    case "restart":
      return { ...action.defaultState, isStarted: true };

    default:
      throw new Error("Unknown action");
  }
}
