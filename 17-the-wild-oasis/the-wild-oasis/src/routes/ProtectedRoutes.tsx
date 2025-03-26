import { Navigate, Outlet } from "react-router";

type Props = {
  isLoggedIn: boolean;
};

export default function ProtectedRoutes({ isLoggedIn }: Props) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
