import { useAppSelector } from "../../lib/hooks";
import { getUser } from "./userSlice";

export default function Username() {
  const name = useAppSelector(getUser);

  if (!name) return null;

  return <div className="hidden text-sm font-semibold sm:block">{name}</div>;
}
