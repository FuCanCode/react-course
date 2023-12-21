import { useState } from "react";

export default function Item4() {
  const [bgc, setBgc] = useState({ backgroundColor: "hsl(17, 78%, 51%)" });

  return <div className="item item-4" style={bgc}></div>;
}
