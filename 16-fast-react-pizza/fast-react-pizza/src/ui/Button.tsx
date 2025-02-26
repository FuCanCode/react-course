import { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  hidden?: boolean;
  action?: Function; //() => void;
  to?: string;
  type?: "small" | "primary" | "secondary" | "round";
}

export default function Button(props: ButtonProps) {
  const {
    children,
    disabled = false,
    action,
    to,
    type = "primary",
    hidden = false,
  } = props;

  const baseStyles = hidden
    ? "hidden"
    : " text-sm inline-block font-semibold tracking-wide uppercase transition-colors duration-300 bg-yellow-400 rounded-full text-stone-800 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const typeStyles = {
    primary: baseStyles + " px-4 py-3 md:px-6 md:py-4",
    small: baseStyles + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    round: baseStyles + " px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
    secondary: hidden
      ? "hidden"
      : " px-4 py-2.5 md:px-6 md:py-3.5 text-sm inline-block font-semibold border-2 border-stone-300 tracking-wide uppercase transition-colors duration-300 bg-transparent rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-300 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 focus:text-stone-800 disabled:cursor-not-allowed",
  };

  const handleClick = () => {
    if (!action) return;

    action();

    return;
  };

  if (to)
    return (
      <Link onClick={handleClick} to={to} className={typeStyles[type]}>
        {children}
      </Link>
    );

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={typeStyles[type]}
    >
      {children}
    </button>
  );
}
