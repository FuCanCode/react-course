import { useState } from "react";
import setRdmColor from "./rdmColor";

export default function Item3() {
  const [bgc, setBgc] = useState({ backgroundColor: "hsl(61, 78%, 51%)" });
  setTimeout(() => {
    console.log("New Render...");
    setBgc(() => setRdmColor());
  }, 3000);
  return (
    <div className="item item-3" style={bgc}>
      3
    </div>
  );
}
