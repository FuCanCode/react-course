import { useState } from "react";
import { globalState } from "./App";

export default function Form() {
  const [item, setItem] = useState("");
  const [qty, setQty] = useState(1);

  // Select options
  const numOptions = 10;
  const options = [];
  for (let index = 0; index < numOptions; index++) {
    options.push(index + 1);
  }

  function submitHandler(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    if (!item) return alert("Please enter a Description!");

    // add item to state
    globalState.addItem(qty, item);

    // at the end clear input
    setItem(() => "");
    setQty(() => 1);
  }

  return (
    <form className="add-form" onSubmit={submitHandler}>
      <h3>What do you need for your trip?</h3>

      <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
        {options.map((opt) => (
          <option value={opt} key={opt}>
            {opt}
          </option>
        ))}
      </select>

      <input
        name="item"
        type="text"
        placeholder="Item..."
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button type="submit">add</button>
    </form>
  );
}
