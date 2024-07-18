import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../../hooks/useCities";
import { useCity } from "../../hooks/useCity";
import Spinner from "../Spinner/Spinner";
import Button from "../Button/Button";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // const { cities } = useCities();
  // TEMP DATA
  // const { id } = useParams();

  // const currentCity = cities.find((c) => c.id === Number(id));
  /* {
    cityName: "Lisbon",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
  }; */

  // if (!currentCity) return <h1>City not found ;(</h1>;
  const navigate = useNavigate();
  const { city, isLoading } = useCity();

  if (isLoading) return <Spinner />;

  if (!city) return <h1>City not found ;(</h1>;

  const { cityName, emoji, date, notes } = city;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date) || null}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          type={"back"}
          action={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
}

export default City;
