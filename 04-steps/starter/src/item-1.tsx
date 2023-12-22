import { useState } from "react";
import setRdmColor from "./rdmColor";

export default function Item1() {
  const [bgc, setBgc] = useState({ backgroundColor: "hsl(347, 63%, 46%)" });

  setTimeout(() => {
    setBgc(() => setRdmColor());
  }, 3000);

  return (
    <div className="item item-1" style={bgc}>
      1
    </div>
  );
}
