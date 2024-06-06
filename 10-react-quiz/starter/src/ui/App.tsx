import Header from "./Header";
import Main from "./Main";
//import useFakeApi from "../../data/useFakeApi";
import { QUIZ_URL } from "../../data/useFakeApi";
import { QuizItem, quizReducer } from "../../data/quizReducer";
import { useEffect, useReducer } from "react";
import Quiz from "./Quiz";
import { ProgressProps } from "./Progress";
import QuizIntro from "./QuizIntro";
import { initQuizState } from "../initQuizState";
import Loader from "./Loader";
import Error from "./Error";

function App() {
  const [quizState, dispatch] = useReducer(quizReducer, initQuizState);
  const { currentQuestion, points, status, timeLeft, questions } = quizState;
  //const quizItems = useFakeApi();
  useEffect(() => {
    async function getQuestions() {
      try {
        const res = await fetch(QUIZ_URL);
        const questions: QuizItem[] = await res.json();
        dispatch({ type: "setQuestions", questions: questions });
      } catch (error) {
        console.log(error);
        dispatch({ type: "error" });
      }
    }

    setTimeout(getQuestions, 2000);
  }, []);

  const progress: ProgressProps = {
    curQuestion: currentQuestion + 1,
    maxQuestions: questions.length,
    curPoints: points,
    maxPoints: questions.reduce((sum, question) => sum + question.points, 0),
  };

  return (
    <>
      <div className="app">
        <Header />
        <Main>
          {status === "loading" ? <Loader /> : null}
          {status === "error" ? <Error /> : null}
          {status === "ready" ? (
            <QuizIntro
              numberOfQuestions={progress.maxQuestions}
              action={() => dispatch({ type: "startGame" })}
            />
          ) : null}

          {status === "active" ? (
            <Quiz
              quizItem={questions[currentQuestion]}
              progress={progress}
              actions={dispatch}
              timeLeft={timeLeft}
            />
          ) : null}
        </Main>
      </div>
    </>
  );
}

export default App;
