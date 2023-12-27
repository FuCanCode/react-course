import Form from "./Form";
import Heading from "./Heading";
import List from "./List";
import { ItemList } from "./ClassItemList";
import { items } from "./itemsData";

export const globalState = new ItemList(items);

function App() {
  return (
    <>
      <Heading />
      <Form />
      <List />
    </>
  );
}

export default App;
