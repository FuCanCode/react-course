import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { CityProps } from "../../data/types";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }: { city: CityProps }) {
  const { id, cityName, date, emoji } = city;

  return (
    <li>
      <Link to={`${id}`} className={styles.cityItem}>
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
