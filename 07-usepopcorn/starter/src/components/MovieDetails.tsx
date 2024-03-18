import { useEffect, useState } from "react";
import { ApiMovieObject, getMovieDetails } from "../lib/data";
import StarRating from "./StarRating";
import { Loader } from "../App";

export default function MovieDetails(props: {
  movieID: string;
  onSelect: React.Dispatch<React.SetStateAction<string | null>>;
}): JSX.Element | null {
  const [movie, setMovie] = useState<null | ApiMovieObject>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { movieID, onSelect } = props;

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
              <StarRating className="rating" size={24} />
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
