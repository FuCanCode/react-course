import { useState } from "react";

// Select options
const numOptions = 15;
// const options: number[] = [];
// for (let index = 0; index < numOptions; index++) {
//   options.push(index + 1);
// }
const options = Array.from({ length: numOptions }, (_, i) => i + 1);

export default function Form({
  submitHandler,
}: {
  submitHandler(
    e: React.FormEvent<HTMLFormElement>,
    name: string,
    quantity: number
  ): void;
}) {
  // state
  const [qty, setQty] = useState(1);
  const [input, setInput] = useState("");

  // handler
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    submitHandler(e, input, qty);
    setInput("");
    setQty(1);
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
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
        autoFocus={true}
        autoComplete="off"
        type="text"
        placeholder="Item..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" disabled={input.length === 0}>
        add
      </button>
    </form>
  );
}
