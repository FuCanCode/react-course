import { useEffect, useRef } from "react";
import { useKeyboardKey } from "../customHooks/useKey";

interface SearchInputProps {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchInput({
  searchString,
  setSearchString,
}: SearchInputProps) {
  const inputRef = useRef<null | HTMLInputElement>(null);

  // Focus on Enter and reset searchString, but not when already focused
  function handleFocusOnEnter() {
    if (document.activeElement === inputRef.current) return;
    setSearchString("");
    inputRef.current?.focus();
  }

  useKeyboardKey("Enter", handleFocusOnEnter);

  // Focus on load
  useEffect(() => inputRef.current?.focus(), []);

  return (
    <input
      ref={inputRef}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={searchString}
      onChange={(e) => setSearchString(e.target.value)}
    />
  );
}
