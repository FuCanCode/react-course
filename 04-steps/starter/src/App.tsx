import Steps from "./Steps";

import "./App.css";
import Item1 from "./item-1";
import Item2 from "./item-2";
import Item3 from "./item-3";
import Item4 from "./item-4";

function App() {
  return (
    <>
      <Steps />
      <div className="grid-play">
        <Item1 />
        <Item2 />
        <Item3 />
        <Item4 />
      </div>
    </>
  );
}

export default App;
