import { ReactNode, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      navigate("/");
    },
    [isLoggedIn, navigate]
  );

  return isLoggedIn ? children : null;
}

export default ProtectedRoute;
