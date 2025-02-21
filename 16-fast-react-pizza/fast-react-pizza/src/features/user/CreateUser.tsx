import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";

function CreateUser() {
  const [username, setUsername] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
          <Button type="primary" to="menu">
            Go to the menu
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
