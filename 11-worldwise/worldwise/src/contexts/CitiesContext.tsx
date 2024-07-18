import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { CityProps } from "../../data/types";

const BASE_URL = "http://localhost:8000";

interface ICitiesContext {
  cities: CityProps[];
  isLoading: boolean;
}

const CitiesContext = createContext<ICitiesContext>({} as ICitiesContext);

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

export function useCity() {
  const cityContext = useContext(CitiesContext);
  if (!cityContext) throw Error("No access to context provider!");
  return cityContext;
}

export default CitiesContext;
