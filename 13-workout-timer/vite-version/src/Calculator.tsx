import { useState, memo, useEffect } from 'react';
import clickSound from './ClickSound.m4a';
import { Workouts } from './definitions';

function Calculator({ workouts, allowSound }: {workouts: Workouts, allowSound: boolean}) {
  const [number, setNumber] = useState(workouts.at(0)!.numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);
  const [duration, setDuration] = useState(0)

  // const playSound = useCallback(function () {
  //   if (!allowSound) return;
  //   const sound = new Audio(clickSound);
  //   sound.play();
  // },[allowSound]);

  useEffect(()=>{
    setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
   },[number, sets, speed, durationBreak])

   useEffect(()=>{
    if (!allowSound || !navigator.userActivation.hasBeenActive) return;
    const sound = new Audio(clickSound);
      sound.play().catch(()=>console.log("Catched the audio error!"));
   },[duration])

  // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  function handleIncr(){
    setDuration(dur=> Math.floor(dur) + 1);
  }

  function handleDecr(){
    setDuration(dur=> dur > 1 ? Math.ceil(dur) - 1 : 0);
  }

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type='range'
            min='1'
            max='5'
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type='range'
            min='30'
            max='180'
            step='30'
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type='range'
            min='1'
            max='10'
            value={durationBreak}
            onChange={(e) => setDurationBreak(Number(e.target.value))}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDecr}>–</button>
        <p>
          {mins < 10 && '0'}
          {mins}:{seconds < 10 && '0'}
          {seconds}
        </p>
        <button onClick={handleIncr}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator);