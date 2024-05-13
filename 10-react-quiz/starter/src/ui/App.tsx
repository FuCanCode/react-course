import Header from "./Header";
import Main from "./Main";
import useFakeApi from "../../data/useFakeApi";
import { quizReducer, QuizState } from "../../data/quizReducer";
import { useReducer } from "react";
import Quiz, { ProgressProps } from "./Quiz";
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
  const progress: ProgressProps = {
    curQuestion: currentQuestion + 1,
    maxQuestions: quizItems.length,
    curPoints: points,
    maxPoints: quizItems.reduce((sum, question) => sum + question.points, 0),
  };

  return (
    <>
      <div className="app">
        <Header />
        <Main>
          {!hasStarted ? (
            <QuizIntro action={() => dispatch({ type: "startGame" })} />
          ) : (
            <Quiz quizItem={quizItems[currentQuestion]} progress={progress} />
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
