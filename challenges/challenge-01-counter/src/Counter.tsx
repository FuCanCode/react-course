import { useState } from "react";

export default function Counter() {
  const [steps, setSteps] = useState(1);
  const [count, setCount] = useState(0);

  const today = new Date();
  const calcDate = new Date(today.getTime() + 24 * count * 60 * 60 * 1000);

  const printMessage = function (): string {
    let firstPart: string = "";

    switch (true) {
      case count < -1:
        firstPart = `${Math.abs(count)} days ago was `;
        break;

      case count === -1:
        firstPart = `Yesterday was `;
        break;

      case count === 1:
        firstPart = `Tomorrow will be `;
        break;

      case count > 1:
        firstPart = `In ${Math.abs(count)} days will be `;
        break;

      default:
        firstPart = "Today is ";
        break;
    }

    return `${firstPart} ${calcDate.toLocaleDateString("de-de")}`;
  };

  return (
    <>
      <div className="controls">
        <button
          className="decrease"
          onClick={() => setSteps((step) => (step > 1 ? step - 1 : 1))}
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
          onClick={() => setCount((count) => count - steps)}
        >
          -
        </button>
        <p className="text">{`Counter: ${count}`}</p>
        <button
          className="increase"
          onClick={() => setCount((count) => count + steps)}
        >
          +
        </button>
      </div>

      <p className="message">{printMessage()}</p>
    </>
  );
}
