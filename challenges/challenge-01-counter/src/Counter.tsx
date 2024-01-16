import { useState } from "react";

export default function Counter() {
  const [steps, setSteps] = useState(1);
  const [count, setCount] = useState(0);

  const today = new Date();
  const calcDate = new Date(today.getTime() + 24 * count * 60 * 60 * 1000);

  /* const printMessage = function (): string {
    let firstPart: string = "";
    const datePart: string = calcDate.toDateString();

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

    return `${firstPart} ${datePart}`;
  }; */

  return (
    <>
      <div className="controls">
        <input
          type="range"
          name="slider"
          id="slider"
          min={0}
          max={20}
          value={steps}
          onChange={(e) => setSteps(+e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="slider">{steps} Steps</label>
      </div>

      <div className="controls">
        <button onClick={() => setSteps((step) => (step > 1 ? step - 1 : 1))}>
          -
        </button>
        <p>{`Steps: ${steps}`}</p>
        <button onClick={() => setSteps((step) => step + 1)}>+</button>
      </div>

      <div className="controls">
        <button onClick={() => setCount((count) => count - steps)}>-</button>
        <p>{`Counter: ${count}`}</p>
        <button onClick={() => setCount((count) => count + steps)}>+</button>
      </div>

      {count !== 0 && (
        <div className="controls">
          <button
            onClick={() => {
              setCount(0);
              setSteps(1);
            }}
          >
            Reset
          </button>
        </div>
      )}

      <p className="message">
        {count < -1 && `${Math.abs(count)} days ago was `}
        {count === -1 && `Yesterday was `}
        {count === 0 && `Today is `}
        {count === 1 && `Tomorrow is `}
        {count > 1 && `In ${Math.abs(count)} days will be `}
        {calcDate.toDateString() + "."}
      </p>
    </>
  );
}
