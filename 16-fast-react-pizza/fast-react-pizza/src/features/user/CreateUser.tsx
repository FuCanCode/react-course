import { useState } from "react";
import Button from "../../ui/Button";
import { useAppDispatch } from "../../lib/hooks";
import { setName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!username) return;

    dispatch(setName(username));
    navigate("menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-8 w-72 input"
      />

      {username !== "" && (
        <div>
          <Button type="primary">Go to the menu</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
