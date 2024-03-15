import { ReactNode, useState } from "react";

export function Box(props: { children?: ReactNode; explicitProp?: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
        <>
          {props.explicitProp}
          {props.children}
        </>
      )}
    </div>
  );
}
