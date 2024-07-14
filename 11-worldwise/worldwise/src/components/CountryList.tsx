import { CityProps, Country } from "../../data/types";
import CountryItem from "./CountryItem";
import Message from "./Message";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";

function CountryList({
  cities,
  isLoading,
}: {
  cities: CityProps[];
  isLoading: boolean;
}) {
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="No countries visited yet ;(" />;

  const countries = cities.reduce((countryList: Country[], city: CityProps) => {
    const { country, emoji } = city;

    if (!countryList.some((el) => el?.country === country))
      countryList.push({ country, emoji });

    return countryList;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((c: Country) => (
        <CountryItem country={c} key={c.country} />
      ))}
    </ul>
  );
}

export default CountryList;
