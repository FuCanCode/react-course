import { globalState } from "./App";

export default function Form({
  submitHandler,
  qty,
  item,
  qtyHandler,
  itemHandler,
}) {
  // Select options
  const numOptions = 10;
  const options = [];
  for (let index = 0; index < numOptions; index++) {
    options.push(index + 1);
  }

  return (
    <form className="add-form" onSubmit={submitHandler}>
      <h3>What do you need for your trip?</h3>

      <select value={qty} onChange={qtyHandler}>
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
        onChange={itemHandler}
      />
      <button type="submit">add</button>
    </form>
  );
}
