import { useEffect, useRef } from "react";

interface SearchInputProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchInput({ query, setQuery }: SearchInputProps) {
  const inputRef = useRef<null | HTMLInputElement>(null);

  // Focus on Enter and reset query, but not when already focused
  useEffect(() => {
    const listenReturn = (e: KeyboardEvent) => {
      if (document.activeElement === inputRef.current) return;

      if (e.key === "Enter") {
        setQuery("");
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", listenReturn);

    return () => document.removeEventListener("keydown", listenReturn);
  }, [setQuery]);

  // Focus on load
  useEffect(() => inputRef.current?.focus(), []);

  return (
    <input
      ref={inputRef}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
