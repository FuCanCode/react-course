import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function NotFound() {
  const error = useRouteError() as { data?: string; message?: string };

  const errMessage: string = error.message || error.data || "Unknown error";

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{errMessage}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;
