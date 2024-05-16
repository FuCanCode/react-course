interface TimerProps {
  timeLeft: number;
}

function Timer(props: TimerProps) {
  const minutes = 8;
  const seconds = 59;
  return (
    <div className="timer">
      {minutes}:{seconds}
    </div>
  );
}

export default Timer;
