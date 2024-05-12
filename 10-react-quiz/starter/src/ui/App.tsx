import Header from "./Header";
import Main from "./Main";
import useFakeApi from "../../data/useFakeApi";
import { quizReducer, QuizState } from "../../data/quizReducer";
import { useReducer } from "react";
import Quiz from "./Quiz";
import QuizIntro from "./QuizIntro";

const initQuizState: QuizState = {
  currentQuestion: 0,
  points: 0,
  hasStarted: false,
};

function App() {
  const [quizState, dispatch] = useReducer(quizReducer, initQuizState);

  const quizItems = useFakeApi();

  const { currentQuestion, points, hasStarted } = quizState;

  return (
    <>
      <div className="app">
        <Header />
        <Main>
          {!hasStarted ? (
            <QuizIntro />
          ) : (
            <Quiz quizItem={quizItems[currentQuestion]} />
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
