import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import { useCities } from "../../hooks/useCities";

function Map() {
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([
    51.0772193, 13.7082522,
  ]);
  const { cities } = useCities();

  const [params] = useSearchParams();

  const lat = Number(params.get("lat"));
  const lng = Number(params.get("lng"));

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  console.log("render");

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <ChnageCenter position={mapPosition} />
        <DetectClick />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((c) => {
          const position: LatLngExpression = [c.position.lat, c.position.lng];
          return (
            <Marker position={position} key={c.id}>
              <Popup>
                <span>{c.emoji}</span> <span>{c.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        {/* <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
}

function ChnageCenter({ position }: { position: LatLngExpression }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent("click", (me) => {
    const { lat, lng } = me.latlng;

    navigate(`/app/form?lat=${lat}&lng=${lng}`);
  });

  return null;
}

export default Map;
