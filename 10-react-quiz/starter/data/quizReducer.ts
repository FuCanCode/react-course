export interface QuizState {
  currentQuestion: number;
  points: number;
  isStarted: boolean;
}
export type QuizAction =
  | { type: "startGame" }
  | { type: "nextQuestion" }
  | { type: "addPoints"; pointsToAdd: number };

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

    default:
      throw new Error("Unknown action");
  }
}
