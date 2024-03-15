import { ReactNode } from "react";

export function Main(props: { children: ReactNode[] }) {
  return <main className="main">{props.children}</main>;
}
