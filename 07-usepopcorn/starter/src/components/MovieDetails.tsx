import { useEffect, useState } from "react";
import {
  ApiMovieObject,
  convertToWatchedMovie,
  getMovieDetails,
  WatchedMovie,
} from "../lib/data";
import StarRating from "./StarRating";
import { Loader } from "../App";

export default function MovieDetails(props: {
  userRating: number | false;
  movieID: string;
  onSelect: React.Dispatch<React.SetStateAction<string | null>>;
  onRate: React.Dispatch<React.SetStateAction<WatchedMovie[] | []>>;
}): JSX.Element | null {
  const [movie, setMovie] = useState<null | ApiMovieObject>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);

  const { movieID, onSelect, onRate, userRating } = props;

  useEffect(() => {
    const loadMovie = async () => {
      setIsLoading(true);
      const data = await getMovieDetails(movieID);
      setIsLoading(false);
      if (typeof data === "string") return;
      setMovie(data);
    };
    loadMovie();
  }, [movieID]);

  if (!movie) return null;

  const handleAddWatchedMovie = () => {
    const newWatched = convertToWatchedMovie(movie);
    onRate((watchedArr) => {
      return [...watchedArr, { ...newWatched, userRating: rating }];
    });
    onSelect(null);
  };

  const {
    Poster: poster,
    Title: title,
    Released: released,
    Runtime: runtime,
    Genre: genre,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Director: director,
  } = movie;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        movie && (
          <div className="details">
            <header>
              <button className="btn-back" onClick={() => onSelect(null)}>
                &larr;
              </button>
              <img src={poster} alt={`Poster of movie ${title}`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runtime}
                </p>
                <p>{genre}</p>
                <p>
                  <span>⭐️</span>
                  {imdbRating} IMDb rating
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                {userRating ? (
                  <p>🌟 {userRating}</p>
                ) : (
                  <StarRating getRating={setRating} size={24} />
                )}
                {rating !== 0 && (
                  <button onClick={handleAddWatchedMovie} className="btn-add">
                    + Add To List
                  </button>
                )}
              </div>
              <p>{plot}</p>
              <p>Starring: {actors}</p>
              <p>Directed by: {director}</p>
            </section>
          </div>
        )
      )}
    </>
  );
}