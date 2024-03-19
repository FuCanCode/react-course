import { useState } from "react";
import { Movie, WatchedMovie } from "../lib/data";

export function List(props: {
  list: WatchedMovie[] | Movie[] | null;
  onItemSelect: (id: string) => void;
  onItemDelete?: (id: string) => void;
}) {
  if (!props.list) return null;

  return (
    <ul className="list list-movies">
      {props.list.map((movie) => {
        const isWatched = "userRating" in movie;
        const details = isWatched
          ? [
              "⭐️ " + movie.imdbRating,
              "🌟 " + movie.userRating,
              "⏳ " + movie.runtime,
            ]
          : ["🗓️ " + movie.Year];

        return (
          <ListItem
            key={movie.imdbID}
            item={movie}
            details={details}
            onItemSelect={props.onItemSelect}
            onItemDelete={props.onItemDelete}
          />
        );
      })}
    </ul>
  );
}
function ListItem(props: {
  item: Movie | WatchedMovie;
  details: string[];
  onItemSelect: (id: string) => void;
  onItemDelete?: (id: string) => void;
}) {
  const [imgErr, setImgErr] = useState(false);

  const { details, item, onItemDelete, onItemSelect } = props;

  const fallback = "./src/assets/fallBack.png";

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    onItemDelete && onItemDelete(item.imdbID);
  }

  return (
    <li onClick={() => onItemSelect(item.imdbID)}>
      <img
        src={!imgErr ? item.Poster : fallback}
        onError={() => setImgErr(true)}
        alt={`${item.Title} poster`}
      />
      <h3>{item.Title}</h3>
      <ListDetails details={details} />
      {typeof onItemDelete === "function" && (
        <button onClick={handleDelete} className="btn-delete">
          X
        </button>
      )}
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
