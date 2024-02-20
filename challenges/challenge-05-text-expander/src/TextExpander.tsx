import { useState } from "react";

interface ITextExpander {
  children: string;
  wording?: [string, string];
  wordsCollapsed?: number;
  color?: string;
  extended?: boolean;
}

export default function TextExpander(props: ITextExpander) {
  const {
    children,
    wording = ["Show more", "Show less"],
    wordsCollapsed = 10,
    color = "rebeccapurple",
    extended = false,
  } = props;

  const [isExpanded, setIsExpanded] = useState<boolean>(extended);

  const text = isExpanded
    ? children
    : children.split(" ").slice(0, wordsCollapsed).join(" ") + "...";

  const boxStyle = {
    padding: "10px",
    borderRadius: "7px",
    backgroundColor: "#343a40",
    marginTop: "1rem",
  };

  const linkStyle: React.CSSProperties = {
    marginLeft: "0.4rem",
    color,
    cursor: "pointer",
  };

  return (
    <div style={boxStyle}>
      {text}
      <a
        style={linkStyle}
        role="button"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {wording[isExpanded ? 1 : 0]}
      </a>
    </div>
  );
}
