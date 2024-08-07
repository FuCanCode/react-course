import { ReactNode, createContext, useEffect, useReducer } from "react";
import {
  QuizAction,
  QuizItem,
  quizReducer,
  QuizState,
} from "../../data/quizReducer";
import { initQuizState } from "../initQuizState";
import { QUIZ_URL } from "../../data/useFakeApi";

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

  useEffect(() => {
    if (state.questions.length) return;

    async function getQuestions() {
      try {
        const res = await fetch(QUIZ_URL);
        const data: QuizItem[] = await res.json();
        dispatch({ type: "setQuestions", questions: data });
      } catch (error) {
        console.log(error);
        dispatch({ type: "error" });
      }
    }

    setTimeout(getQuestions, 2000);
  }, [state.questions, dispatch]);

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
