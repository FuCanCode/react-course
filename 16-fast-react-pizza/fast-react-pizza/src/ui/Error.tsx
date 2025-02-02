import { useNavigate, useRouteError } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError() as { data?: string; message?: string };

  const errMessage: string = error.message || error.data || "Unknown error";

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{errMessage}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default NotFound;
