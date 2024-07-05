import { ReactNode } from "react";

function Header({ children }: { children: ReactNode }) {
  return <header>{children}</header>;
}

export default Header;
