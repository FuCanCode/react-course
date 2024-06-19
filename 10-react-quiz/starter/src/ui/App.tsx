import Header from "./Header";
import Main from "./Main";
//import useFakeApi from "../../data/useFakeApi";
import { QUIZ_URL } from "../../data/useFakeApi";
import { QuizItem, quizReducer } from "../../data/quizReducer";
import { useEffect, useReducer } from "react";
import Progress, { ProgressProps } from "./Progress";
import QuizIntro from "./QuizIntro";
import { initQuizState } from "../initQuizState";
import Loader from "./Loader";
import Error from "./Error";
import Question from "./Question";
import Result from "./Result";
import NextButton from "./NextButton";

function App() {
  const [quizState, dispatch] = useReducer(quizReducer, initQuizState);
  const { currentQuestion, points, status, timeLeft, questions, answer } =
    quizState;
  const question = questions[currentQuestion];
  //const quizItems = useFakeApi();
  useEffect(() => {
    if (questions.length) return;

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
  }, [questions]);

  const progress: ProgressProps = {
    curQuestion: currentQuestion,
    maxQuestions: questions.length,
    curPoints: points,
    maxPoints: questions.reduce((sum, question) => sum + question.points, 0),
    isAnswered: answer !== null,
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
            <>
              <Progress {...progress} />
              <Question
                key={question.id}
                timeLeft={timeLeft}
                actions={dispatch}
                question={question}
                answer={answer}
              />
              <NextButton
                dispatch={dispatch}
                isVisible={answer !== null}
                isLastQuestion={
                  progress.curQuestion + 1 === progress.maxQuestions
                }
              />
            </>
          ) : null}
          {status === "finished" ? (
            <Result
              points={[progress.curPoints, progress.maxPoints]}
              timeOver={timeLeft <= 0}
              onRestart={() =>
                dispatch({ type: "restart", defaultState: initQuizState })
              }
            />
          ) : null}
        </Main>
      </div>
    </>
  );
}

export default App;
