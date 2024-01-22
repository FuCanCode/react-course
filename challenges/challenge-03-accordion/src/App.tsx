import { faqs } from "./data";
import Accordion from "./Accordion";

function App() {
  return (
    <>
      <Accordion questions={faqs} />
    </>
  );
}

export default App;
