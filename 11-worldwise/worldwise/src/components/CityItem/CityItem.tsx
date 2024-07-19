import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { CityProps } from "../../../data/types";
import { useCities } from "../../hooks/useCities";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }: { city: CityProps }) {
  const { currentCity } = useCities();
  const {
    id,
    cityName,
    date,
    emoji,
    position: { lat, lng },
  } = city;

  const isCurrentCity = currentCity?.id === id;

  return (
    <li>
      <Link
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          isCurrentCity ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date} dateTime={date}>
          {formatDate(date)}
        </time>
        <button className={styles.deleteBtn}>x</button>
      </Link>
    </li>
  );
}

export default CityItem;
