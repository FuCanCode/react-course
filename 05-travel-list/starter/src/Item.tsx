import { useState } from "react";
import { iItem } from "./itemsData";
import { globalState } from "./App";

export default function Item(item: iItem) {
  const [checked, setChecked] = useState(item.packed);

  const setPackStatus = function () {
    setChecked(() => (checked ? false : true));

    globalState.togglePackStatus(item.id);
    console.log(globalState);
  };

  return (
    <li>
      <input
        type="checkbox"
        name="isPacked"
        id={String(item.id)}
        checked={checked ? true : false}
        onClick={setPackStatus}
      />
      <span>{item.quantity}</span>
      <span>{item.description}</span>
      <button>&times;</button>
    </li>
  );
}
