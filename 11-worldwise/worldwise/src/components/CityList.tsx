import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import { CityProps } from "../../data/types";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCity } from "../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCity();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Start by adding cities from the map!" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city: CityProps) => (
        <CityItem key={city.date} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
