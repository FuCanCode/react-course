const KEY = "9ab7e87f";
const URL = `http://www.omdbapi.com/?apikey=${KEY}&`;

export interface iMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface iWatchedMovies extends iMovie {
  runtime: number;
  imdbRating: number;
  userRating: number;
}

export interface iSummary {
  numMovies: number;
  imdbRating: number;
  userRating: number;
  runtime: number;
}

interface ApiSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface ApiMovieObject extends ApiSearchResult {
  Genre: string;
  imdBRating: string;
  Runtime: string;
  Released: string;
  Plot: string;
  Actors: string;
  Director: string;
}

export const tempWatchedData: iWatchedMovies[] = [
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

export async function getApiResult(query: string, type: "search" | "item") {
  try {
    const response = await fetch(
      `${URL}${type === "search" ? "s" : "i"}=${query}`
    );

    if (!response || !response.ok)
      throw new Error("Server Error! Aaaarlarm!!!");

    const json = await response.json();
    if (json.Error) throw new Error(json.Error);

    if (type === "item") return json as ApiMovieObject;

    const searchResults: ApiSearchResult[] = json.Search;
    const appResults: iMovie[] = searchResults.map(
      ({ imdbID, Title, Year, Poster }) => ({ imdbID, Title, Year, Poster })
    );

    return appResults;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);

      return error.message;
    } else {
      console.log(error);
    }
  }
}
export const average = (arr: number[]): number => {
  return arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);
};
