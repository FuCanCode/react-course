export default function Bill(props: {
  children: string;
  input: string;
  onInput: () => void;
}) {
  return (
    <div>
      {props.children}{" "}
      <input
        type="number"
        value={props.input}
        onChange={(e) => props.onInput(e.target.value)}
      />
    </div>
  );
}
