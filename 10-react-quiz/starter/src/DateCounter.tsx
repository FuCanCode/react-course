import { useReducer } from "react";

interface DateCountState {
  count: number;
  step: number;
}

type DateCountAction =
  | { type: "dec" }
  | { type: "inc" }
  | { type: "reset"; resetState: DateCountState }
  | { type: "defineCount"; newCount: number }
  | { type: "defineStep"; newStep: number };
// type: "dec" | "inc" | "defineCount" | "defineStep" | "reset";

function dateCountReducer(
  state: DateCountState,
  action: DateCountAction
): DateCountState {
  switch (action.type) {
    case "dec":
      return {
        ...state,
        count: state.count - state.step,
      };

    case "inc":
      return {
        ...state,
        count: state.count + state.step,
      };

    case "defineCount":
      return {
        ...state,
        count: action.newCount,
      };

    case "defineStep":
      return {
        ...state,
        step: action.newStep,
      };

    case "reset": {
      return action.resetState;
    }

    default:
      throw Error("Unknown action: " + action.type);
  }
}

const initialState: DateCountState = { count: 0, step: 1 };

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);
  const [state, dispatch] = useReducer(dateCountReducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  // const date = new Date("june 21 2027");
  // date.setDate(date.getDate() + count);
  const today: Date = new Date();
  const displayDate: Date = new Date(today);
  displayDate.setDate(displayDate.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({ type: "inc" });
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "defineCount", newCount: Number(e.target.value) });
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "defineStep", newStep: Number(e.target.value) });
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({ type: "reset", resetState: initialState });
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{displayDate.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
