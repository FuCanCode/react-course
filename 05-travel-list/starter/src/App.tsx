import { useState } from "react";
import Form from "./Form";
import Heading from "./Heading";
import List from "./List";
import { items } from "./itemsData";

const initialList = items;

function App() {
  const [list, setList] = useState(initialList);

  /////////////////////
  // Handler functions
  function submitHandler(
    e: React.FormEvent<HTMLFormElement>,
    name: string,
    quantity: number
  ) {
    e.preventDefault();

    setList([
      {
        id: crypto.randomUUID(),
        description: name,
        quantity: quantity,
        packed: false,
      },
      ...list,
    ]);

    console.log(list);
  }

  return (
    <>
      <Heading />
      <Form submitHandler={submitHandler} />
      <List list={list} />
    </>
  );
}

export default App;
