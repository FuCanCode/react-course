import { useState, useEffect, createContext, ReactNode } from "react";
import { CityProps } from "../../data/types";

import { BASE_URL } from "../appConfig";

interface ICitiesContext {
  cities: CityProps[];
  currentCity: CityProps | null;
  isLoading: boolean;
  getCity: (id: number) => void;
}

export const CitiesContext = createContext<ICitiesContext | null>(null);

export function CitiesContextProvider({ children }: { children: ReactNode }) {
  const [cities, setCities] = useState<CityProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState<CityProps | null>(null);

  useEffect(() => {
    async function fetchCities() {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const cities: CityProps[] = await res.json();
        setCities(cities);
      } catch (error) {
        alert("Could not load Data.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id: number) {
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/cities/${id}`);

      const city: CityProps = await res.json();

      setCurrentCity(city);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong :(";

      throw Error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

export default CitiesContext;
