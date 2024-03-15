import { iSummary } from "../../lib/data";
import { ListDetails } from "../List/List";

export function Summary(props: { summaryProps: iSummary | null }) {
  if (!props.summaryProps)
    return (
      <div className="summary">
        <h2>no videos watched yet?!</h2>
      </div>
    );

  const { numMovies, imdbRating, userRating, runtime } = props.summaryProps;
  const details = [
    "#️⃣ " + numMovies + " movies",
    "⭐️ " + imdbRating,
    "🌟 " + userRating,
    "⏳ " + runtime + " min",
  ];
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <ListDetails details={details} />
    </div>
  );
}
