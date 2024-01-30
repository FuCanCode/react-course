import { ChangeEvent } from "react";

export default function Rating(props: {
  children: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      {props.children}
      <select
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          props.onChange(Number(e.target.value))
        }
      >
        <option value="0">Disgusting! (0%)</option>
        <option value="5">Okayish... (5%)</option>
        <option selected value="10">
          Pretty good! (10%)
        </option>
        <option value="20">Amazing! (20%)</option>
      </select>
    </div>
  );
}
