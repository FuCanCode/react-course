import { iMovie, iWatchedMovies } from "../../lib/data";

export function List(props: { list: iWatchedMovies[] | iMovie[] | null }) {
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
export function ListDetails(props: { details: string[] }) {
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
