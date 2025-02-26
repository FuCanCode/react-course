import { useState } from "react";
import { getAddress } from "../services/apiGeocoding";

export function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<{ lat: number; lng: number }>();
  const [address, setAddress] = useState("");
  const [error, setError] = useState<null | string>(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const {
          coords: { latitude, longitude },
        } = pos;
        setPosition({
          lat: latitude,
          lng: longitude,
        });

        const { city, postcode } = await getAddress({ latitude, longitude });
        setAddress(postcode + " " + city);

        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
  }
  return { isLoading, position, error, getPosition, address };
}
