import { useState } from "react";

export default function Item3() {
  const [bgc, setBgc] = useState({ backgroundColor: "hsl(61, 78%, 51%)" });

  return <div className="item item-3" style={bgc}></div>;
}
