import { useState } from "react";
import Button from "../Button/Button";
import "./addFriend.css";

export default function AddFriend(props: {
  onAddFriend: (name: string, imgURL: string) => void;
}) {
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>("");
  const [imgURLInput, setImgURLInput] = useState<string>("");

  function submitAddFriend(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!nameInput) return alert("Please enter a name!");

    props.onAddFriend(nameInput, imgURLInput);

    setNameInput("");
    setImgURLInput("");
  }

  return (
    <div className="add-friend">
      {formIsOpen && (
        <form>
          <label htmlFor="name">Friend Name</label>
          <input
            type="text"
            name="name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <label htmlFor="url">Image URL</label>
          <input
            type="text"
            name="url"
            placeholder="leave empty for random"
            value={imgURLInput}
            onChange={(e) => setImgURLInput(e.target.value)}
          />
          <Button eventHandler={submitAddFriend}>Add</Button>
        </form>
      )}
      <Button eventHandler={() => setFormIsOpen(!formIsOpen)}>
        {formIsOpen ? "Close" : "Add Friend!"}
      </Button>
    </div>
  );
}
