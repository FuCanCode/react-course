import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

interface LinkButtonProps {
  children: ReactNode;
  to: string;
}

export default function LinkButton(props: LinkButtonProps) {
  const { children, to } = props;
  const navigate = useNavigate();

  const styles = "text-sm text-blue-500 hover:text-blue-600";

  if (to === "-1")
    return (
      <button onClick={() => navigate(-1)} className={styles}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={styles}>
      {children}
    </Link>
  );
}
