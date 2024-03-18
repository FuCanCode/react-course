import { useState } from "react";

const containerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle: React.CSSProperties = {
  display: "flex",
};

interface IStarRatingProps {
  starsAmount?: number;
  color?: string;
  size?: number;
  className?: string;
  messages?: string[];
  defaultRating?: number;
  getRating?: (rating: number) => void;
}

export default function StarRating(props: IStarRatingProps) {
  const [stars, setStars] = useState<number>(props.defaultRating || 0);
  const [lockedStars, setLockedStars] = useState<number | null>(
    props.defaultRating || null
  );

  const {
    starsAmount = 10,
    color = "#fcc419",
    size = 48,
    className = "",
    messages = [],
  } = props;

  const textStyle: React.CSSProperties = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  const isValidTextMapping = starsAmount % messages?.length === 0;

  const message = isValidTextMapping
    ? messages[Math.round(stars / (starsAmount / messages.length)) - 1]
    : stars || "";

  function handleClick(stars: number) {
    setLockedStars(stars);
    props.getRating && props.getRating(stars);
  }

  return (
    <div className={className} style={containerStyle}>
      <div style={containerStyle}>
        <div style={starContainerStyle}>
          {Array.from({ length: starsAmount }, (_, i) => {
            return (
              <Star
                key={i}
                settings={{ color, size }}
                full={stars >= i + 1}
                onStarClick={() => handleClick(stars)}
                onHoverIn={() => setStars(i + 1)}
                onHoverOut={() => setStars(lockedStars || 0)}
              />
            );
          })}
        </div>
        <p style={textStyle}>{message}</p>
      </div>
    </div>
  );
}

interface iStarProps {
  onStarClick: () => void;
  full: boolean;
  onHoverIn: () => void;
  onHoverOut: () => void;
  settings: { color: string; size: number };
}

function Star(props: iStarProps) {
  const { color, size } = props.settings;

  const starStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  const fullStar = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={color}
      stroke={color}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const halfStar = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
    >
      <path
        // stroke="#ffd700"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="{2}"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );

  return (
    <span
      role="button"
      style={starStyle}
      onClick={props.onStarClick}
      onMouseEnter={props.onHoverIn}
      onMouseLeave={props.onHoverOut}
    >
      {props.full ? fullStar : halfStar}
    </span>
  );
}
