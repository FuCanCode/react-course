import { useAppSelector } from "../../lib/hooks";
import { selectUser } from "./userSlice";

export default function Username() {
  const name = useAppSelector(selectUser);

  if (!name) return null;

  return <div className="hidden text-sm font-semibold sm:block">{name}</div>;
}
