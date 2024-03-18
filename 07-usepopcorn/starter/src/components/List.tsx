import { useState } from "react";
import { Movie, WatchedMovie } from "../lib/data";

export function List(props: {
  list: WatchedMovie[] | Movie[] | null;
  onItemSelect: (id: string) => void;
}) {
  if (!props.list) return null;

  return (
    <ul className="list list-movies">
      {props.list.map((movie) => {
        const details =
          "userRating" in movie
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
}) {
  const [imgErr, setImgErr] = useState(false);
  const fallback = "./src/assets/fallBack.png";

  return (
    <li onClick={() => props.onItemSelect(props.item.imdbID)}>
      <img
        src={!imgErr ? props.item.Poster : fallback}
        onError={() => setImgErr(true)}
        alt={`${props.item.Title} poster`}
      />
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
