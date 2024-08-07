import { QUIZ_URL } from "../../data/useFakeApi";
import { QuizItem } from "../../data/quizReducer";
import { useEffect } from "react";

import Main from "./Main";
import QuizIntro from "./QuizIntro";
import Header from "./Header";
import Progress from "./Progress";
import Loader from "./Loader";
import Error from "./Error";
import Question from "./Question";
import Result from "./Result";
import NextButton from "./NextButton";
import Timer from "./Timer";
import Footer from "./Footer";
import { useQuiz } from "../hooks/use-quiz";

function App() {
  const { status, questions, answer, dispatch } = useQuiz();

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
  }, [questions, dispatch]);

  return (
    <>
      <div className="app">
        <Header />
        <Main>
          {status === "loading" ? <Loader /> : null}
          {status === "error" ? <Error /> : null}
          {status === "ready" ? <QuizIntro /> : null}

          {status === "active" ? (
            <>
              <Progress />
              <Question />
              <Footer>
                <Timer />
                {answer !== null && <NextButton />}
              </Footer>
            </>
          ) : null}
          {status === "finished" ? <Result /> : null}
        </Main>
      </div>
    </>
  );
}

export default App;
