import { ReactNode, useEffect, useState } from "react";
import StarRating from "./StarRating";
import {
  getSearchResults,
  iMovie,
  iSummary,
  iWatchedMovies,
  tempMovieData,
  tempWatchedData,
} from "./lib/data";

const average = (arr: number[]): number => {
  return arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);
};

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating color="red" defaultRating={2} getRating={setMovieRating} />
      <p>This movie was rated {movieRating} Stars.</p>
    </div>
  );
}

export default function App() {
  const [movies, setMovies] = useState<iMovie[] | null>(null);
  const [watched, setWatched] = useState(tempWatchedData);

  useEffect(() => {
    let ignore = false;

    const getData = async function () {
      const initData = await getSearchResults("inception");
      setMovies(initData ? initData : null);
    };

    if (!ignore) getData();

    return () => {
      ignore = true;
    };
  }, []);

  const summaryProps: iSummary | null = !watched
    ? null
    : {
        numMovies: watched.length,
        imdbRating: average(watched.map((movie) => movie.imdbRating)),
        userRating: average(watched.map((movie) => movie.userRating)),
        runtime: average(watched.map((movie) => movie.runtime)),
      };

  return (
    <>
      <NavBar>
        <Logo />
        <SearchInput onSearch={setMovies} />
        <Results results={movies ? movies.length : null} />
      </NavBar>

      <Test />
      {/* <StarRating
        starsAmount={5}
        defaultRating={2}
        messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      />
      <StarRating starsAmount={6} messages={["Bad", "Better", "Best"]} /> */}

      <Main>
        <Box explicitProp={<List list={movies} />} />
        <Box>
          <Summary summaryProps={summaryProps} />
          <List list={watched} />
        </Box>
      </Main>
    </>
  );
}

function Main(props: { children: ReactNode[] }) {
  return <main className="main">{props.children}</main>;
}

function ListDetails(props: { details: string[] }) {
  let key = 0;
  return (
    <div>
      {props.details.map((d: string) => (
        <p key={key++}>
          <span>{d.split(" ")[0]}</span>
          <span>{d.split(" ").slice(1).join(" ")}</span>
        </p>
      ))}
    </div>
  );
}

function List(props: { list: iWatchedMovies[] | iMovie[] | null }) {
  if (!props.list) return null;

  return (
    <ul className="list">
      {props.list.map((movie) => {
        const details =
          "userRating" in movie
            ? [
                "⭐️ " + movie.imdbRating,
                "🌟 " + movie.userRating,
                "⏳ " + movie.runtime,
              ]
            : ["🗓️ " + movie.Year];

        return <ListItem key={movie.imdbID} item={movie} details={details} />;
      })}
    </ul>
  );
}

function ListItem(props: { item: iMovie | iWatchedMovies; details: string[] }) {
  return (
    <li>
      <img src={props.item.Poster} alt={`${props.item.Title} poster`} />
      <h3>{props.item.Title}</h3>
      <ListDetails details={props.details} />
    </li>
  );
}

function Box(props: { children?: ReactNode; explicitProp?: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
        <>
          {props.explicitProp}
          {props.children}
        </>
      )}
    </div>
  );
}

function Summary(props: { summaryProps: iSummary | null }) {
  if (!props.summaryProps)
    return (
      <div className="summary">
        <h2>no videos watched yet?!</h2>
      </div>
    );

  const { numMovies, imdbRating, userRating, runtime } = props.summaryProps;
  const details = [
    "#️⃣ " + numMovies + " movies",
    "⭐️ " + imdbRating,
    "🌟 " + userRating,
    "⏳ " + runtime + " min",
  ];
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <ListDetails details={details} />
    </div>
  );
}

function NavBar(props: { children: ReactNode | ReactNode[] }) {
  return <nav className="nav-bar">{props.children}</nav>;
}

function Results(props: { results: number | null }) {
  return (
    <p className="num-results">
      {props.results ? (
        <>
          Found <strong>{props.results}</strong> results
        </>
      ) : (
        <>
          <strong>Search for a movie!</strong>
        </>
      )}
    </p>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchInput({
  onSearch,
}: {
  onSearch: React.Dispatch<React.SetStateAction<iMovie[] | null>>;
}) {
  const [query, setQuery] = useState("");

  async function handlePressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const newMovieList = await getSearchResults(query);

      setQuery("");

      if (!newMovieList)
        return onSearch([
          {
            Title: "Couldn't find any movie!",
            imdbID: "",
            Poster: "",
            Year: "",
          },
        ]);

      onSearch(newMovieList);
    }
  }

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handlePressEnter}
    />
  );
}
