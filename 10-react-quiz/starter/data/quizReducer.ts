export interface QuizState {
  currentQuestion: number;
  points: number;
  hasStarted: boolean;
}
export type QuizAction = { type: "startGame" };

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "startGame":
      return {
        ...state,
        hasStarted: true,
      };

    default:
      throw new Error("Unknown action");
  }
}
