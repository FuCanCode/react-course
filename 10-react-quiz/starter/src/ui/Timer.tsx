import { useEffect, useRef } from "react";
import { useQuiz } from "../hooks/use-quiz";

function Timer() {
  const { timeLeft, dispatch } = useQuiz();
  const intervalRef = useRef<number>();

  // effect 1 controls behavior on mount/unmount
  useEffect(() => {
    // prevents double tick in strict mode
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const id = setInterval(() => dispatch({ type: "timerTick" }), 1000);
    intervalRef.current = id;

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [dispatch]);

  // effect 2 checks for time running out
  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalRef.current);
      dispatch({ type: "finish" });
    }
  }, [timeLeft, dispatch]);

  const displayMinutes = Math.trunc(timeLeft / 60);
  const displaySeconds = timeLeft % 60;
  return (
    <div className="timer">
      {displayMinutes}:{`${displaySeconds < 10 ? "0" : ""}` + displaySeconds}
    </div>
  );
}

export default Timer;
