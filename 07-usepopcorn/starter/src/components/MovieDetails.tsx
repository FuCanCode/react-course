import { useEffect, useMemo, useRef, useState } from "react";
import { ApiMovieObject, WatchedMovie } from "../lib/data";
import StarRating from "./StarRating";
import { Loader } from "../App";
import { useMovies } from "../customHooks/useMovies";

export default function MovieDetails(props: {
  watchedList: WatchedMovie[] | [];
  movieID: string;
  onSelect: React.Dispatch<React.SetStateAction<string | null>>;
  onRate: React.Dispatch<React.SetStateAction<WatchedMovie[] | []>>;
}): JSX.Element | null {
  const { movieID, onSelect, onRate, watchedList } = props;
  const { data: movie, isLoading } = useMovies<ApiMovieObject>("i=" + movieID);

  const [rating, setRating] = useState<number>(0);

  const clickCountRef = useRef<number>(0);

  const isWatched = useMemo(
    () => watchedList.map((w) => w.imdbID).includes(movieID),
    [watchedList, movieID]
  );
  const userRating = useMemo(
    () =>
      isWatched
        ? watchedList.find((w) => w.imdbID === movieID)?.userRating
        : null,
    [movieID, watchedList, isWatched]
  );

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (["Escape", "D"].includes(e.key)) onSelect(null);
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  });

  useEffect(() => {
    if (movie) document.title = movie.Title;
    return () => {
      document.title = "usePopcorn";
    };
  }, [movie]);

  useEffect(() => {
    if (!rating) return;
    clickCountRef.current++;
  }, [rating]);

  if (!movie) return null;

  const handleAddWatchedMovie = () => {
    const { imdbID, imdbRating, Title, Year, Poster } = movie;

    const newWatched = {
      imdbID,
      Title,
      Year,
      Poster,
      runtime: Number(movie.Runtime.split(" ")[0]),
      imdbRating: Number(imdbRating),
      userRating: rating,
      countUserDecisions: clickCountRef.current,
    };

    const nextWatched = [...watchedList, newWatched];
    onRate(nextWatched);
    onSelect(null);
  };

  const handleRating = (newRating: number) => {
    setRating(newRating);
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
                {isWatched ? (
                  <p>Your personal rating: 🌟 {userRating}</p>
                ) : (
                  <StarRating getRating={handleRating} size={24} />
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
