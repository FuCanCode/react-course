import Header from "./Header";
import Main from "./Main";
import useFakeApi from "../../data/useFakeApi";

function App() {
  const quizItems = useFakeApi();
  return (
    <>
      <div className="app">
        <Header />
        <Main>
          {quizItems.length && quizItems.map((i) => <p>{i.question}</p>)}
        </Main>
      </div>
    </>
  );
}

export default App;
