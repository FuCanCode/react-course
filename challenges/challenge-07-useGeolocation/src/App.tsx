import { useRef, useState } from "react";

export default function App() {
  const [coords, isLoading, error, getCoords] = useGeolocation();

  const countRef = useRef(0);

  if (isLoading) console.log("Loading");

  function handleGetPosition() {
    countRef.current++;
    getCoords();
  }

  return (
    <>
      <button disabled={isLoading} onClick={handleGetPosition}>
        Get Your Location
      </button>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {coords && !error.length && !isLoading && (
        <p>
          Your position is{" "}
          <a
            target="_blank"
            href={`https://www.openstreetmap.org/?mlat=${coords.lat}&mlon=${coords.lng}`}
          >
            {coords.lat},{coords.lng}
          </a>
        </p>
      )}
      {countRef.current > 0 && (
        <p>You requested position {countRef.current} times</p>
      )}
    </>
  );
}

type Coords = {
  lat: number;
  lng: number;
};

type GeoState = [
  coords: Coords | null,
  isLoading: boolean,
  error: string,
  getCoords: () => void
];

function useGeolocation(initialValue?: Coords): GeoState {
  const [coords, setCoords] = useState<Coords | null>(initialValue || null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function getCoords() {
    if (!navigator.geolocation)
      return setError("Your browser doesn't support Geolocation");

    const successCallback: PositionCallback = (position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      setCoords({ lat, lng });
      setError("");
      setIsLoading(() => false);
    };

    const errorCallback: PositionErrorCallback = (error) => {
      console.log(error);
      setCoords(null);
      setError(error.message);
      setIsLoading(() => false);
    };

    setIsLoading(() => true);
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }

  return [coords, isLoading, error, getCoords];
}
