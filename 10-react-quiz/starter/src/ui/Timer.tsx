import { useEffect, useRef } from "react";
import { QuizAction } from "../../data/quizReducer";

function Timer({
  secondsLeft = 60 * 3,
  tickAction,
}: {
  secondsLeft: number;
  tickAction: React.Dispatch<QuizAction>;
}) {
  const intervalRef = useRef<number>();

  // effect 1 controls behavior on mount/unmount
  useEffect(() => {
    // prevents double tick in strict mode
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const id = setInterval(() => tickAction({ type: "timerTick" }), 1000);
    intervalRef.current = id;

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [tickAction]);

  // effect 2 checks for time running out
  useEffect(() => {
    if (secondsLeft === 0) {
      clearInterval(intervalRef.current);
    }
  }, [secondsLeft]);

  const displayMinutes = Math.trunc(secondsLeft / 60);
  const displaySeconds = secondsLeft % 60;
  return (
    <div className="timer">
      {displayMinutes}:{`${displaySeconds < 10 ? "0" : ""}` + displaySeconds}
    </div>
  );
}

export default Timer;
