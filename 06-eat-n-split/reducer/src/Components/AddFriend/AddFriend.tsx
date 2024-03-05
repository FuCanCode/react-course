import { useState } from "react";
import Button from "../Button/Button";
import "./addFriend.css";
import { AddedFriend, iPeople } from "../../reducer/ensReducer";
import { useAppDispatchContext } from "../../context/AppProvider";

export default function AddFriend() {
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>("");
  const [imgURLInput, setImgURLInput] = useState<string>("");

  const dispatch: React.Dispatch<AddedFriend> = useAppDispatchContext();

  function submitAddFriend(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!nameInput) return alert("Please enter a name!");

    const id = Math.round(Math.random() * 99999);
    const newFriend: iPeople = {
      id,
      name: nameInput,
      image: imgURLInput ? imgURLInput : `https://i.pravatar.cc/48?u=${id}`,
      balance: 0,
    };

    dispatch({
      type: "added_friend",
      newFriend,
    });

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
