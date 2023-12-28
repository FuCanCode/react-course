import { useState } from "react";
import Form from "./Form";
import Heading from "./Heading";
import List from "./List";
import { ItemList } from "./ClassItemList";
import { items } from "./itemsData";

export const globalState = new ItemList(items);

function App() {
  const [item, setItem] = useState("");
  const [qty, setQty] = useState(1);
  const [list, setList] = useState(globalState.getList());

  // Handler functions
  function submitHandler(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    if (!item) return alert("Please enter a Description!");

    // add item to state
    globalState.addItem(qty, item);

    // at the end clear input
    setItem(() => "");
    setQty(() => 1);
  }

  function qtyHandler(ev: React.ChangeEvent<HTMLSelectElement>) {
    setQty(Number(ev.target.value));
  }

  function itemHandler(ev: React.ChangeEvent<HTMLInputElement>) {
    setItem(ev.target.value);
  }

  return (
    <>
      <Heading />
      <Form {...{ submitHandler, qty, item, qtyHandler, itemHandler }} />
      <List {...{ list }} />
    </>
  );
}

export default App;
