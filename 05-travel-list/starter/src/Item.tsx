import { useState } from "react";
import { iItem } from "./itemsData";

export default function Item(item: iItem) {
  const [checked, setChecked] = useState(item.packed);

  // skip render on deleted items
  if (item.deleted) return;

  const setPackStatus = function () {
    setChecked(() => (checked ? false : true));
  };

  return (
    <li>
      <input
        type="checkbox"
        name="isPacked"
        id={String(item.id)}
        checked={checked ? true : false}
        onChange={setPackStatus}
      />
      <span>{item.quantity}</span>
      <span>{item.description}</span>
      <button>&times;</button>
    </li>
  );
}
