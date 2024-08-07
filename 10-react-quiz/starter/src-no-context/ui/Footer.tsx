import { ReactNode } from "react";

function Footer(props: { children: ReactNode }) {
  return <footer>{props.children}</footer>;
}

export default Footer;
