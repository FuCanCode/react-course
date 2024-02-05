import { ReactNode } from "react";
import "./button.css";

interface ButtonProps {
  children: ReactNode;
  eventHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button(props: ButtonProps) {
  return <button onClick={props.eventHandler}>{props.children}</button>;
}
