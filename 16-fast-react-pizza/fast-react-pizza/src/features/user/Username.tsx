import { useAppSelector } from "../../lib/hooks";
import { getUserName } from "./userSlice";

export default function Username() {
  const name = useAppSelector(getUserName);

  if (!name) return null;

  return <div className="hidden text-sm font-semibold sm:block">{name}</div>;
}
