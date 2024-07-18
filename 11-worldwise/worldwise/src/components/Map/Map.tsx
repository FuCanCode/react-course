import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [params, setParams] = useSearchParams();
  const redirect = useNavigate();

  const coords = {
    lat: params.get("lat"),
    lng: params.get("lng"),
  };

  const handleMapClick = () => {
    redirect(`/app/form?${params.toString()}`);
  };

  return <div className={styles.mapContainer} onClick={handleMapClick}></div>;
}

export default Map;
