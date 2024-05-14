export interface QuizState {
  currentQuestion: number;
  points: number;
  isStarted: boolean;
}
export type QuizAction = { type: "startGame" } | { type: "nextQuestion" };

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

    default:
      throw new Error("Unknown action");
  }
}
