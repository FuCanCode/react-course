import CreateUser from "../features/user/CreateUser";
import { getUserName } from "../features/user/userSlice";
import { useAppSelector } from "../lib/hooks";
import Button from "./Button";

function Home() {
  const username = useAppSelector(getUserName);
  return (
    <div className="px-4 my-10 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl text-stone-700">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="menu">go to the menu, {username}</Button>
      )}
    </div>
  );
}

export default Home;
