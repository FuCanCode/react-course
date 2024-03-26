import { useEffect, useState } from "react";
import { ApiSearchResult, Movie, BASE_URL } from "../lib/data";

export function useMovies<T>(
  query: string,
  callback?: () => void
): {
  data: T | null;
  isLoading: boolean;
  error: string;
} {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => callback?.(), [callback, query]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchMovies() {
      if (!query || query.length < 5) return;

      setError("");
      setIsLoading(true);

      try {
        const resp = await fetch(BASE_URL + query, { signal });

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

          setData(appData as T);
        } else {
          setData(json as T);
        }
        setError("");
      } catch (error) {
        setData(null);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("See error in console");
          console.log(error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();

    return () => controller.abort();
  }, [query]);

  return { data, isLoading, error };
}
