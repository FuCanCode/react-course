import { ReactNode, createContext, useReducer } from "react";
import {
  QuizAction,
  QuizItem,
  quizReducer,
  QuizState,
} from "../../data/quizReducer";
import { initQuizState } from "../initQuizState";

interface IQuizContext extends QuizState {
  dispatch: React.Dispatch<QuizAction>;
  getCurrentQuestion: () => QuizItem;
  getMaxPoints: () => number;
  restartQuiz: () => void;
}

export const QuizContext = createContext<IQuizContext | null>(null);

export default function QuizContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(quizReducer, initQuizState);

  function getCurrentQuestion() {
    return state.questions[state.currentQuestion];
  }

  function getMaxPoints() {
    return state.questions.reduce((sum, question) => {
      return sum + question.points;
    }, 0);
  }

  function restartQuiz() {
    dispatch({
      type: "restart",
      defaultState: { ...initQuizState, highscore: state.highscore },
    });
  }

  return (
    <QuizContext.Provider
      value={{
        ...state,
        dispatch,
        getCurrentQuestion,
        getMaxPoints,
        restartQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
