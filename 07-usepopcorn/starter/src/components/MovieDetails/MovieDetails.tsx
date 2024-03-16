import { ApiMovieObject } from "../../lib/data";
import StarRating from "../StarRating/StarRating";

export default function MovieDetails(props: {
  movie: ApiMovieObject;
}): JSX.Element {
  const movie = props.movie;

  return (
    <div className="details">
      <header>
        <button className="btn-back">←</button>
        <img src={movie.Poster} alt={`Poster of movie ${movie.Title}`} />
        <div className="details-overview">
          <h2>{movie.Title}</h2>
          <p>{`${movie.Released} • ${movie.Runtime} min`}</p>
          <p>{movie.Genre}</p>
          <p>
            <span>⭐️</span>
            {movie.imdBRating + " IMDb rating"}
          </p>
        </div>
      </header>
      <section>
        <StarRating className="rating" />
        <p>{movie.Plot}</p>
        <p>{"Starring: " + movie.Actors}</p>
        <p>{"Directed by: " + movie.Director}</p>
      </section>
    </div>
  );
}
