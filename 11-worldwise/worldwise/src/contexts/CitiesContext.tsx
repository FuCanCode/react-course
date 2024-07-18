import { useState, useEffect, createContext, ReactNode } from "react";
import { CityProps } from "../../data/types";

import { BASE_URL } from "../appConfig";

interface ICitiesContext {
  cities: CityProps[];
  isLoading: boolean;
}

export const CitiesContext = createContext<ICitiesContext | null>(null);

export function CitiesContextProvider({ children }: { children: ReactNode }) {
  const [cities, setCities] = useState<CityProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}

export default CitiesContext;
