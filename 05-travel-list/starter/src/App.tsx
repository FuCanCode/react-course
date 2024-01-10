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

  function deleteHandler(itemId: string) {
    setList(
      list.map((item) => {
        if (itemId === item.id) {
          return {
            ...item,
            deleted: true,
          };
        } else return item;
      })
    );
  }

  function packHandler(itemId: string) {
    setList(
      list.map((item) => {
        if (itemId === item.id) {
          return {
            ...item,
            packed: !item.packed,
          };
        } else return item;
      })
    );
  }

  return (
    <>
      <Heading />
      <Form submitHandler={submitHandler} />
      <List
        list={list}
        deleteHandler={deleteHandler}
        packHandler={packHandler}
      />
    </>
  );
}

export default App;
