import { useEffect, useRef } from "react";

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
  useEffect(() => {
    const listenReturn = (e: KeyboardEvent) => {
      if (document.activeElement === inputRef.current) return;

      if (e.key === "Enter") {
        setSearchString("");
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", listenReturn);

    return () => document.removeEventListener("keydown", listenReturn);
  }, [setSearchString]);

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
