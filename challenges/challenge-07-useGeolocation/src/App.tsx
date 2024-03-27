import { useState } from "react";

export default function App() {
  const [coords, getCoords] = useGeolocation({ lat: 50, lng: 30 });

  console.log("render App");

  return (
    <>
      <button onClick={getCoords}>Get Your Location</button>
      {coords && (
        <p>
          Your psoition is{" "}
          <a
            target="_blank"
            href={`https://www.openstreetmap.org/?mlat=${coords.lat}&mlon=${coords.lng}`}
          >
            {coords.lat},{coords.lng}
          </a>
        </p>
      )}
      <p>You requested postion x times</p>
    </>
  );
}

type Coords = {
  lat: number;
  lng: number;
};
function useGeolocation(
  initialValue: Coords | null = null
): [coords: Coords | null, getCoords: () => void] {
  const [coords, setCoords] = useState<Coords | null>(initialValue);

  function getCoords() {
    const successCallback: PositionCallback = (position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      setCoords({ lat, lng });
    };

    navigator.geolocation.getCurrentPosition(successCallback, (x) =>
      console.log(x)
    );
  }

  return [coords, getCoords];
}
