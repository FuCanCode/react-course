import { useState } from "react";
import setRdmColor from "./rdmColor";

export default function Item2() {
  const [bgc, setBgc] = useState({ backgroundColor: "hsl(216, 63%, 46%)" });

  setTimeout(() => {
    setBgc(() => setRdmColor());
  }, 3000);
  return (
    <div className="item item-2" style={bgc}>
      2
    </div>
  );
}
