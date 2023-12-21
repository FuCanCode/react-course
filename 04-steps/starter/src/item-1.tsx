import { useState } from "react";

export default function Item1() {
  const [bgc, setBgc] = useState({ backgroundColor: "hsl(347, 63%, 46%)" });

  return <div className="item item-1" style={bgc}></div>;
}
