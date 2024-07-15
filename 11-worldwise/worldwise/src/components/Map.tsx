import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [params, setParams] = useSearchParams();

  const coords = {
    lat: params.get("lat"),
    lng: params.get("lng"),
  };

  const mapsLink = `https://www.google.de/maps/@${coords.lat},${coords.lng},10z`;

  const handleClick = () => {
    setParams({ mood: "yeah" });
  };

  return (
    <div className={styles.mapContainer}>
      <a href={mapsLink} target="_blank">
        Link
      </a>
      <button onClick={handleClick}>Do some Magic!</button>
    </div>
  );
}

export default Map;
