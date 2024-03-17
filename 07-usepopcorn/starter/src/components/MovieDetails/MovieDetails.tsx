import { useEffect, useState } from "react";
import { ApiMovieObject, getMovieDetails } from "../../lib/data";
import StarRating from "../StarRating/StarRating";
import { Loader } from "../../App";

export default function MovieDetails(props: {
  movieID: string;
  onSelect: React.Dispatch<React.SetStateAction<string | null>>;
}): JSX.Element {
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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        movie && (
          <div className="details">
            <header>
              <button className="btn-back" onClick={() => onSelect(null)}>
                ←
              </button>
              <img src={movie.Poster} alt={`Poster of movie ${movie.Title}`} />
              <div className="details-overview">
                <h2>{movie.Title}</h2>
                <p>{`${movie.Released} • ${movie.Runtime} min`}</p>
                <p>{movie.Genre}</p>
                <p>
                  <span>⭐️</span>
                  {movie.imdbRating + " IMDb rating"}
                </p>
              </div>
            </header>
            <section>
              <StarRating className="rating" size={24} />
              <p>{movie.Plot}</p>
              <p>{"Starring: " + movie.Actors}</p>
              <p>{"Directed by: " + movie.Director}</p>
            </section>
          </div>
        )
      )}
    </>
  );
}
