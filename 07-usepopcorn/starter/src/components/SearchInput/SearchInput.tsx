import { getSearchResults, iMovie } from "../../lib/data";

interface SearchInputProps {
  // onSearch: React.Dispatch<React.SetStateAction<iMovie[] | null>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchInput({ query, setQuery }: SearchInputProps) {
  // async function handlePressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
  //   if (e.key === "Enter") {
  //     const newMovieList = await getSearchResults(query);

  //     setQuery("");

  //     if (!newMovieList)
  //       return onSearch([
  //         {
  //           Title: "Couldn't find any movie!",
  //           imdbID: "",
  //           Poster: "",
  //           Year: "",
  //         },
  //       ]);

  //     onSearch(newMovieList);
  //   }
  // }

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      // onKeyDown={handlePressEnter}
    />
  );
}
