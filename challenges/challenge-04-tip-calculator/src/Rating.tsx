import { ChangeEvent } from "react";
type Rating = 0 | 5 | 10 | 20;

export default function Rating(props: {
  children: string;
  curRating: number;
  onChange: React.Dispatch<React.SetStateAction<Rating>>;
}) {
  function strictHandler(e: ChangeEvent<HTMLSelectElement>) {
    const selectedOption = Number(e.target.value);

    if (![0, 5, 10, 20].includes(selectedOption))
      return alert("Wrong value at option!");

    props.onChange(selectedOption as Rating);
  }

  return (
    <div>
      <label htmlFor="rating">{props.children}</label>
      <select value={props.curRating} name="rating" onChange={strictHandler}>
        <option value="0">Disgusting! (0%)</option>
        <option value="5">Okayish... (5%)</option>
        <option value="10">Pretty good! (10%)</option>
        <option value="20">Amazing! (20%)</option>
      </select>
    </div>
  );
}
