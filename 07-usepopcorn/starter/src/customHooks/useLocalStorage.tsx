import { useEffect, useState } from "react";
import { WatchedMovie } from "../lib/data";

export function useLocalStorage(
  initialState: WatchedMovie[]
): [
  storedData: WatchedMovie[],
  saveToStore: (newWatched: WatchedMovie[]) => void
] {
  const [storedData, setStoredData] = useState<WatchedMovie[] | []>(
    initialState
  );
  const key = "usePopcornWatchedListData";

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) setStoredData(JSON.parse(stored));
  }, [setStoredData]);

  function saveToStore(newWatchList: WatchedMovie[]) {
    localStorage.setItem(key, JSON.stringify(newWatchList));
    setStoredData(newWatchList);
  }

  return [storedData, saveToStore];
}
