import { globalState } from "./App";

export default function Form() {
  const numOptions = 10;
  const options = [];
  for (let index = 0; index < numOptions; index++) {
    options.push(index + 1);
  }

  function addItem(formData) {
    const x = formData.get("item");
    alert(x);

    // if (!descr) return alert("Please enter a Description");

    // add item to state
    // globalState.addItem(qty, descr);
  }

  return (
    <form action={addItem} className="add-form">
      <h3>What do you need for your trip?</h3>

      <select>
        {options.map((opt) => (
          <option value={opt} key={opt}>
            {opt}
          </option>
        ))}
      </select>

      <input name="item" type="text" placeholder="Item..." />
      <button type="submit">add</button>
    </form>
  );
}
