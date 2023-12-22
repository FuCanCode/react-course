import { useState } from "react";
import setRdmColor from "./rdmColor";

export default function Item4() {
  const [bgc, setBgc] = useState({ backgroundColor: "hsl(17, 78%, 51%)" });
  setTimeout(() => {
    setBgc(() => setRdmColor());
  }, 3000);
  return (
    <div className="item item-4" style={bgc}>
      4
    </div>
  );
}
