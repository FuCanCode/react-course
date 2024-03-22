import { useEffect, useState } from "react";

import {
  getSearchResult,
  Movie,
  iSummary,
  average,
  WatchedMovie,
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./lib/data";
import { SearchInput } from "./components/SearchInput";

import { List } from "./components/List";
import { NavBar, Logo, Results } from "./components/NavBar";
import { Summary } from "./components/Summary";
import { Main } from "./components/Main";
import { Box } from "./components/Box";
import MovieDetails from "./components/MovieDetails";

export default function App() {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [watched, setWatched] = useState<WatchedMovie[] | []>(() =>
    loadFromLocalStorage()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    saveToLocalStorage(watched);
  }, [watched]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setMovies(null);
    setError("");

    const getData = async function () {
      setIsLoading(true);

      const fetchResult: string | Movie[] = await getSearchResult(
        query,
        signal
      );

      setIsLoading(false);
      if (typeof fetchResult === "string") {
        setError(() => fetchResult);
        setMovies(() => null);
        return;
      }

      setMovies(() => fetchResult);
      setError(() => "");
    };

    if (query.length >= 3) {
      getData();
    }

    return () => {
      controller.abort();
    };
  }, [query]);

  const summaryProps: iSummary | null = !watched
    ? null
    : {
        numMovies: watched.length,
        imdbRating: average(watched.map((movie) => movie.imdbRating)),
        userRating: average(watched.map((movie) => movie.userRating || 0)),
        runtime: average(watched.map((movie) => movie.runtime)),
      };

  function handleMovieSelect(id: string) {
    setSelectedMovie(id === selectedMovie ? null : id);
  }

  function handleDeleteMovie(movieID: string) {
    const nextMovies = watched.filter((w) => w.imdbID !== movieID);
    setWatched(nextMovies);
    setSelectedMovie(null);
  }

  return (
    <>
      <NavBar>
        <Logo />
        <SearchInput
          /* onSearch={setMovies} */ query={query}
          setQuery={setQuery}
        />
        <Results results={movies ? movies.length : null} />
      </NavBar>
      <Main>
        {/* <Box explicitProp={getBoxContent()} /> */}
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage error={error} />}
          {query.length < 3 && (
            <p className="error">📽️ Search for a movie! 🎬</p>
          )}
          {movies && <List list={movies} onItemSelect={handleMovieSelect} />}
        </Box>
        <Box>
          {selectedMovie && (
            <MovieDetails
              watchedList={watched}
              onRate={setWatched}
              movieID={selectedMovie}
              onSelect={setSelectedMovie}
            />
          )}
          {!selectedMovie && (
            <>
              <Summary summaryProps={summaryProps} />
              <List
                list={watched}
                onItemSelect={setSelectedMovie}
                onItemDelete={handleDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export function Loader() {
  return <p className="loader">Loading in progress...</p>;
}

export function ErrorMessage(props: { error?: string }) {
  const { error = "Error (not specified)" } = props;

  return (
    <p className="error">
      <span>⛔</span> {error}
    </p>
  );
}
