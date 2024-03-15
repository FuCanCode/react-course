import { useEffect, useState } from "react";

import { getApiResult, iMovie, iSummary, tempWatchedData } from "./lib/data";
import { SearchInput } from "./components/SearchInput/SearchInput";
import { average } from "./lib/data";
import { List } from "./components/List/List";
import { NavBar, Logo, Results } from "./components/NavBar/NavBar";
import { Summary } from "./components/Summary/Summary";
import { Main } from "./components/Layout/Main";
import { Box } from "./components/Layout/Box";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);

//   return (
//     <div>
//       <StarRating color="red" defaultRating={2} getRating={setMovieRating} />
//       <p>This movie was rated {movieRating} Stars.</p>
//     </div>
//   );
// }

export default function App() {
  const [movies, setMovies] = useState<iMovie[] | null>(null);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let ignore = false;

    const getData = async function () {
      setIsLoading(true);
      setError("");

      const fetchResult = await getApiResult(query, "search");

      setIsLoading(false);
      if (typeof fetchResult === "string") {
        setError(fetchResult);
        return;
      }

      setMovies(fetchResult ? fetchResult : null);
    };

    if (!ignore && query.length > 3) {
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
      case query === "":
        return <p className="error">📽️ Search for a movie! 🎬</p>;
      default:
        return <List list={movies} />;
    }
  };

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

      {/* <Test /> */}
      {/* <StarRating
        starsAmount={5}
        defaultRating={2}
        messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      />
      <StarRating starsAmount={6} messages={["Bad", "Better", "Best"]} /> */}

      <Main>
        <Box explicitProp={getBoxContent()} />
        <Box>
          <Summary summaryProps={summaryProps} />
          <List list={watched} />
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading in progress...</p>;
}
