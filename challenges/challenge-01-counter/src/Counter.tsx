import { useState } from "react";

export default function Counter() {
  const [steps, setSteps] = useState(1);
  const [count, setCount] = useState(1);

  const today = new Date();
  const customDate = today.getTime() + 24 * (count * steps) * 60 * 60 * 1000;
  const isToday = count === 0;
  const isFuture = today.getTime() < customDate;
  const message = ``;

  return (
    <>
      <div className="controls">
        <button
          className="decrease"
          onClick={() => setSteps((step) => step - 1)}
        >
          -
        </button>
        <p className="text">{`Steps: ${steps}`}</p>
        <button
          className="increase"
          onClick={() => setSteps((step) => step + 1)}
        >
          +
        </button>
      </div>

      <div className="controls">
        <button
          className="decrease"
          onClick={() => setCount((count) => count - 1)}
        >
          -
        </button>
        <p className="text">{`Counter: ${count}`}</p>
        <button
          className="increase"
          onClick={() => setCount((count) => count + 1)}
        >
          +
        </button>
      </div>

      <p className="message">{`Today is ${today.toLocaleDateString()}. ${Math.abs(
        count * steps
      )} days is ${new Date(customDate).toLocaleDateString()}`}</p>
    </>
  );
}
