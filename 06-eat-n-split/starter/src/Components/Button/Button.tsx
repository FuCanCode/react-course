import "./button.css";

export default function Button(props: {
  children: string;
  onClickHandler: () => void;
}) {
  return <button onClick={props.onClickHandler}>{props.children}</button>;
}
