const KEY = "9ab7e87f";
const URL = `http://www.omdbapi.com/?apikey=${KEY}&`;

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface WatchedMovie extends Movie {
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

interface ApiSearchObject {
  Search: ApiSearchResult[];
}

export interface ApiMovieObject extends ApiSearchResult {
  Genre: string;
  imdbRating: string;
  Runtime: string;
  Released: string;
  Plot: string;
  Actors: string;
  Director: string;
}

export const tempWatchedData: WatchedMovie[] = [
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

export async function getSearchResult(
  query: string
): Promise<Movie[] | string> {
  const json = await fetchOMDB(`${URL}s=${query}`);

  if (json instanceof Error) return json.message;

  if (!("Search" in json)) return "Something's wrong with the search object";

  const apiData: ApiSearchResult[] = json.Search;
  const appData: Movie[] = apiData.map(({ imdbID, Title, Year, Poster }) => ({
    imdbID,
    Title,
    Year,
    Poster,
  }));

  return appData;
}

export async function getMovieDetails(
  query: string
): Promise<ApiMovieObject | string> {
  const json = await fetchOMDB(`${URL}i=${query}`);

  if (json instanceof Error) return json.message;

  if ("Search" in json)
    return "Something's wrong with the movie details object";

  return json;
}

async function fetchOMDB(URL: string) {
  try {
    const response = await fetch(URL);

    if (!response || !response.ok)
      throw new Error("Server Error! Aaaarlarm!!!");

    const json = await response.json();
    if (json.Error) throw new Error(json.Error);

    return json as ApiMovieObject | ApiSearchObject;
  } catch (error) {
    if (error instanceof Error) {
      return error;
    } else {
      throw error;
    }
  }
}

export function convertToWatchedMovie(movie: ApiMovieObject): WatchedMovie {
  const { imdbID, imdbRating, Title, Year, Poster } = movie;
  return {
    imdbID,
    Title,
    Year,
    Poster,
    runtime: Number(movie.Runtime.split(" ")[0]),
    imdbRating: Number(imdbRating),
    userRating: 10,
  };
}

export const average = (arr: number[]): number => {
  return arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);
};
