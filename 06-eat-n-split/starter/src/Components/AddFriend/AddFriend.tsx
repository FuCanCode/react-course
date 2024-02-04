import { useState } from "react";
import Button from "../Button/Button";
import "./addFriend.css";

export default function AddFriend() {
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);

  return (
    <div className="add-friend">
      {formIsOpen && (
        <form>
          <label htmlFor="name">Friend Name</label>
          <input type="text" name="name" />
          <label htmlFor="url">Image URL</label>
          <input type="text" name="url" />
          <Button onClickHandler={() => alert("Wow, you klicked on a button!")}>
            Add
          </Button>
        </form>
      )}
      <Button onClickHandler={() => setFormIsOpen(!formIsOpen)}>
        {formIsOpen ? "Close" : "Add Friend!"}
      </Button>
    </div>
  );
}
