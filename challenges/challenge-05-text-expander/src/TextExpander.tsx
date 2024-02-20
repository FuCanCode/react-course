import { useState } from "react";

interface ITextExpander {
  children: string;
  wording?: [string, string];
  wordsCollapsed?: number;
  color?: string;
}

export default function TextExpander(props: ITextExpander) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const {
    children,
    wording = ["Show more", "Show less"],
    wordsCollapsed = 10,
    color = "rebeccapurple",
  } = props;

  const text = isExpanded
    ? children
    : children.split(" ").slice(0, wordsCollapsed).join(" ") + "...";

  const linkStyle: React.CSSProperties = {
    marginLeft: "0.4rem",
    color,
    cursor: "pointer",
  };

  return (
    <div>
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
