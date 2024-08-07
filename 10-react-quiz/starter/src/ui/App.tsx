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
  const { status } = useQuiz();

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
                <NextButton />
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
