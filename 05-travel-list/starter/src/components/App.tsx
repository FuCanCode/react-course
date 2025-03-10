import { useState } from "react";
import Form from "./Form";
import Heading from "./Heading";
import List from "./List";
import { items } from "../itemsData";
import Stats from "./Stats";

const initialList = items;
let nextItem = initialList.length + 1;

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

    // if (!name) return;

    setList([
      {
        id: nextItem++,
        description: name,
        quantity: quantity,
        packed: false,
      },
      ...list,
    ]);

    console.log(list);
  }

  function deleteHandler(itemId: number) {
    setList(
      list.map((item) =>
        itemId === item.id ? { ...item, deleted: true } : item
      )
    );
  }

  function packHandler(itemId: number) {
    setList(
      list.map((item) =>
        itemId === item.id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function clearHandler() {
    const confirmed = window.confirm("Are you sure to delete everything?");
    if (!confirmed) return;
    setList([]);
  }

  return (
    <div className="app">
      <Heading />
      <Form submitHandler={submitHandler} />
      <List
        list={list}
        deleteHandler={deleteHandler}
        packHandler={packHandler}
        clearHandler={clearHandler}
      />
      <Stats
        numItems={list.filter((i) => !i.deleted).length}
        numPacked={list.filter((i) => !i.deleted && i.packed).length}
      />
    </div>
  );
}

export default App;
