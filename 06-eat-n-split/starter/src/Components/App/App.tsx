import Button from "../Button/Button";
import People from "../People/People";
import "./app.css";

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
  return (
    <>
      <People list={initialFriends} />
      <Button>Add Friend</Button>
    </>
  );
}

export default App;
