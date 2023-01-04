import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type FilterProviderProps = {
  children: ReactNode;
};

type FilterContextType = {
  filter: string;
  updateFilter: (value: string) => void;
};

const FilterContext = createContext({} as FilterContextType);

export function useFilter() {
  return useContext(FilterContext);
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [filter, setFilter] = useLocalStorage("filter", "");

  function updateFilter(value: string) {
    setFilter(value);
  }

  return (
    <FilterContext.Provider value={{ filter, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
}
