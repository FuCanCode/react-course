import { useState } from "react";

export default function Item2() {
  const [bgc, setBgc] = useState({ backgroundColor: "hsl(216, 63%, 46%)" });

  return <div className="item item-2" style={bgc}></div>;
}
