import { useEffect, useRef } from "react";

interface SearchInputProps {
  // onSearch: React.Dispatch<React.SetStateAction<Movie[] | null>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchInput({ query, setQuery }: SearchInputProps) {
  const inputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => inputRef.current?.focus(), []);

  return (
    <input
      ref={inputRef}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      // onKeyDown={handlePressEnter}
    />
  );
}
