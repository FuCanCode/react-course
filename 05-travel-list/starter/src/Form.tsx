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
          <option value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
