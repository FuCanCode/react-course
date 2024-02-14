import { ReactNode, useState } from "react";

interface iMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}
interface iWatchedMovies extends iMovie {
  runtime: number;
  imdbRating: number;
  userRating: number;
}

interface iSummary {
  numMovies: number;
  imdbRating: number;
  userRating: number;
  runtime: number;
}
const tempMovieData: iMovie[] = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData: iWatchedMovies[] = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr: number[]): number => {
  return arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);
};

export default function App() {
  const [movies, setMovies] = useState<iMovie[] | null>(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <SearchInput />
        <Results results={movies ? movies.length : null} />
      </NavBar>
      <Main>
        <ListBox movieList={movies} />
        <WatchedBox watchedList={watched} />
      </Main>
    </>
  );
}

function Main(props: { children: ReactNode[] }) {
  return <main className="main">{props.children}</main>;
}

function ListDetails(props: { details: string[] }) {
  return (
    <div>
      {props.details.map((d: string) => (
        <p>
          <span>{d.split(" ")[0]}</span>
          <span>{d.split(" ").slice(1)}</span>
        </p>
      ))}
    </div>
  );
}

function List(props: { list: iWatchedMovies[] | iMovie[] }) {
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
            : ["🗓️" + movie.Year];
        return (
          <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <ListDetails details={details} />
          </li>
        );
      })}
    </ul>
  );
}

function WatchedBox(props: { watchedList: iWatchedMovies[] | null }) {
  const [isOpen2, setIsOpen2] = useState(true);

  const summaryProps: iSummary | null = !props.watchedList
    ? null
    : {
        numMovies: props.watchedList.length,
        imdbRating: average(props.watchedList.map((movie) => movie.imdbRating)),
        userRating: average(props.watchedList.map((movie) => movie.userRating)),
        runtime: average(props.watchedList.map((movie) => movie.runtime)),
      };

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && props.watchedList && (
        <>
          <Summary summaryProps={summaryProps} />
          <List list={props.watchedList} />
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
      <div>
        <p>
          <span>#️⃣</span>
          <span>{numMovies} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{runtime} min</span>
        </p>
      </div>
    </div>
  );
}

function ListBox(props: { movieList: iMovie[] | null }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && (
        <ul className="list">
          {props.movieList?.map((movie) => (
            <li key={movie.imdbID}>
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
              <h3>{movie.Title}</h3>
              <div>
                <p>
                  <span>🗓</span>
                  <span>{movie.Year}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
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

function SearchInput() {
  const [query, setQuery] = useState("");

  function handlePressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      // Do something with input

      setQuery("");
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
