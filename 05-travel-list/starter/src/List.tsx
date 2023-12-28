import Item from "./Item";
import { globalState } from "./App";
import { useState } from "react";

export default function List() {
  const [list, setList] = useState(globalState.getList());

  return (
    <div className="list">
      <ul>
        {list.map((item) => (
          <Item {...item} />
        ))}
      </ul>
    </div>
  );
}
