import { useEffect, useState } from "react";

import {
  getSearchResult,
  iMovie,
  iSummary,
  tempWatchedData,
  average,
  getMovieDetails,
  ApiMovieObject,
} from "./lib/data";
import { SearchInput } from "./components/SearchInput/SearchInput";

import { List } from "./components/List/List";
import { NavBar, Logo, Results } from "./components/NavBar/NavBar";
import { Summary } from "./components/Summary/Summary";
import { Main } from "./components/Layout/Main";
import { Box } from "./components/Layout/Box";
import MovieDetails from "./components/MovieDetails/MovieDetails";

export default function App() {
  const [movies, setMovies] = useState<iMovie[] | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<ApiMovieObject | null>(
    null
  );
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let ignore = false;
    setMovies(null);
    setError("");

    const getData = async function () {
      setIsLoading(true);

      const fetchResult = await getSearchResult(query);

      setIsLoading(false);
      if (typeof fetchResult === "string") {
        setError(fetchResult);
        return;
      }

      setMovies(fetchResult ? fetchResult : null);
    };

    if (!ignore && query.length >= 3) {
      getData();
    }

    return () => {
      ignore = true;
    };
  }, [query]);

  const summaryProps: iSummary | null = !watched
    ? null
    : {
        numMovies: watched.length,
        imdbRating: average(watched.map((movie) => movie.imdbRating)),
        userRating: average(watched.map((movie) => movie.userRating)),
        runtime: average(watched.map((movie) => movie.runtime)),
      };

  const getBoxContent = () => {
    switch (true) {
      case isLoading:
        return <Loader />;
      case error.length > 0:
        return (
          <p className="error">
            <span>⛔</span> {error}
          </p>
        );
      case query.length < 3:
        return <p className="error">📽️ Search for a movie! 🎬</p>;
      default:
        return <List list={movies} />;
    }
  };

  /////// TEST //
  ///////////////

  useEffect(() => {
    async function getMovie() {
      const movie = await getMovieDetails("tt1375666");
      if (typeof movie === "string") return;
      console.log(movie);

      setSelectedMovie(movie);
    }

    getMovie();
  }, []);

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
        <Box explicitProp={getBoxContent()} />
        <Box>
          {selectedMovie && <MovieDetails movie={selectedMovie} />}
          {/* <Summary summaryProps={summaryProps} /> */}
          {/* <List list={watched} /> */}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading in progress...</p>;
}
