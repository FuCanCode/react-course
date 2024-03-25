import { useEffect, useState } from "react";
import { ApiSearchResult, Movie } from "../lib/data";

export default function useMovies(
  initialUrl: string
): [
  { data: Movie[] | null; isLoading: boolean; error: string },
  React.Dispatch<React.SetStateAction<string>>
] {
  const [url, setUrl] = useState(initialUrl);
  const [data, setData] = useState<null | Movie[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true);
      try {
        const resp = await fetch(url);

        const json = await resp.json();
        if (json.Error) throw new Error(json.Error);

        if ("Search" in json) {
          const apiData: ApiSearchResult[] = json.Search;
          const appData: Movie[] = apiData.map(
            ({ imdbID, Title, Year, Poster }) => ({
              imdbID,
              Title,
              Year,
              Poster,
            })
          );

          setData(appData);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          console.log(error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies;
  }, [url]);

  return [{ data, isLoading, error }, setUrl];
}
