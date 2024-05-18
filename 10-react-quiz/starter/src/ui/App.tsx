import Header from "./Header";
import Main from "./Main";
import useFakeApi from "../../data/useFakeApi";
import { quizReducer } from "../../data/quizReducer";
import { useReducer } from "react";
import Quiz from "./Quiz";
import { ProgressProps } from "./Progress";
import QuizIntro from "./QuizIntro";
import { initQuizState } from "../initQuizState";

function App() {
  const [quizState, dispatch] = useReducer(quizReducer, initQuizState);

  const quizItems = useFakeApi();

  const { currentQuestion, points, isStarted, timeLeft } = quizState;
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
          {!isStarted ? (
            <QuizIntro action={() => dispatch({ type: "startGame" })} />
          ) : (
            <Quiz
              quizItem={quizItems[currentQuestion]}
              progress={progress}
              actions={dispatch}
              timeLeft={timeLeft}
            />
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
