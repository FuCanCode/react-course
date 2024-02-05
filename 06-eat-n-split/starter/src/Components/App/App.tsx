import { useState } from "react";
import BillForm from "../BillForm/BillForm";
import People from "../People/People";
import "./app.css";
import AddFriend from "../AddFriend/AddFriend";

export interface iPeople {
  id: number;
  name: string;
  image: string;
  balance: number;
}

const initialFriends: iPeople[] = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [list, setList] = useState<iPeople[]>(initialFriends);

  function handleAddFriend(name: string, imageURL?: string) {
    const id = Math.round(Math.random() * 99999);
    const newUrl = imageURL ? imageURL : `https://i.pravatar.cc/48?u=${id}`;

    const newFriend: iPeople = {
      id: id,
      name: name,
      image: newUrl,
      balance: 0,
    };

    setList([...list, newFriend]);

    console.log(newFriend);
  }

  return (
    <div className="app">
      <div className="left">
        <People
          list={list}
          selectedPerson={selectedPerson}
          onSelect={setSelectedPerson}
        />
        <AddFriend onAddFriend={handleAddFriend} />
      </div>

      {selectedPerson && <BillForm />}
    </div>
  );
}

export default App;
