export default function Form() {
  const numOptions = 10;
  const options = [];
  for (let index = 0; index < numOptions; index++) {
    options.push(index + 1);
  }

  return (
    <div className="add-form">
      <h3>What do you need for your trip?</h3>

      <select>
        {options.map((opt) => (
          <option value={opt} key={opt}>
            {opt}
          </option>
        ))}
      </select>

      <input type="text" placeholder="Item..." />
      <button>add</button>
    </div>
  );
}
