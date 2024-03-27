import { useEffect } from "react";

export function useKeyboardKey(keyboardKey: string, action: () => void) {
  useEffect(() => {
    const handlerFunction = (e: KeyboardEvent) => {
      if (document.activeElement instanceof HTMLFormElement) e.preventDefault();
      if (e.key.toLowerCase() === keyboardKey.toLowerCase()) action();
    };

    document.addEventListener("keydown", handlerFunction);

    return () => document.removeEventListener("keydown", handlerFunction);
  }, [action, keyboardKey]);
}
