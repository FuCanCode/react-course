import { useState } from "react";
import Bill from "./Bill";
import Rating from "./Rating";
import Reset from "./Reset";

function App() {
  type Rating = 0 | 5 | 10 | 20;

  const [bill, setBill] = useState("");
  const [myRating, setMyRating] = useState<Rating>(10);
  const [friendRating, setFriendRating] = useState<Rating>(10);

  const tip = (Number(bill) * (myRating + friendRating)) / 200;
  const sum = Number(bill) + tip;

  return (
    <>
      <Bill onInput={setBill} input={bill}>
        How much was the bill?
      </Bill>
      <Rating curRating={myRating} onChange={setMyRating}>
        How did you like the service?
      </Rating>
      <Rating curRating={friendRating} onChange={setFriendRating}>
        How did your friend like the service
      </Rating>
      {bill && (
        <div>
          <h2>
            You pay ${sum} (${bill} + ${tip})
          </h2>
          <Reset
            onReset={() => {
              setBill("");
              setMyRating(10);
              setFriendRating(10);
            }}
          />
        </div>
      )}
    </>
  );
}

export default App;
